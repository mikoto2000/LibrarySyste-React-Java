import { useEffect, useState } from "react";
import { BASE_URL } from "../../config";
import { Configuration, BookStockSearchControllerApiFactory, BookStockStatusEntityControllerApiFactory } from "../../api";
import { Table } from "../../components/Table/Table";
import { Link, useLocation, useNavigate } from "react-router";
import queryString from "query-string";
import { updateOrder } from "../../util/util";

type BookStocksPageProps = {
};

export const BookStocksPage: React.FC<BookStocksPageProps> = ({ }) => {

  const [bookStocks, setBookStocks] = useState<any[] | undefined>([])
  const [bookStockStatuses, setBookStockStatuses] = useState<any[] | undefined>([])

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname
  const search = location.search;
  const queryParams = queryString.parse(search);
  const id: any = queryParams['id'];
  const bookName: any = queryParams['bookName'];
  const memo: any = queryParams['memo'];
  const bookStockStatusIds: any = queryParams['bookStockStatusIds'];
  const sort: any = queryParams['sort'];
  const page: any = queryParams['page'];
  const size: any = queryParams['size'];

  useEffect(() => {
    (async () => {

      const bookStockApiFactory = BookStockSearchControllerApiFactory(new Configuration(), BASE_URL);
      const bookStocksResult = await bookStockApiFactory.executeSearchBookstockGet({
        id: id ? id : undefined,
        bookName: bookName ? bookName : undefined,
        memo: memo ? memo : undefined,
        bookStockStatusIds: bookStockStatusIds ? bookStockStatusIds : undefined,
        page: page ? page : undefined,
        size: size ? size : undefined,
        sort: sort ? sort : undefined,
      });
      console.log(bookStocksResult);
      const bookStocksData = bookStocksResult.data;
      console.log(bookStocksData);

      setBookStocks(bookStocksData?._embedded?.bookStocks);


      const bookStockStatusApiFactory = BookStockStatusEntityControllerApiFactory(new Configuration(), BASE_URL);

      const bookStockStatusResult = await bookStockStatusApiFactory.getCollectionResourceBookstockstatusGet();

      setBookStockStatuses(bookStockStatusResult.data._embedded?.bookStockStatuses)


    })();
  }, [search]);


  return (
    <>
      <Link to="/bookStocks/create">新規登録</Link>
      {/* TODO: ページ遷移せずに、 search の更新だけを行うように修正 */}
      <form action="/bookStocks">
        <div>
          <div>
            <label>Id:</label>
            <input type="number" name="id" defaultValue={id}></input>
          </div>
          <div>
            <label>Name:</label>
            <input type="text" name="bookName" defaultValue={bookName}></input>
          </div>
          <div>
            <label>Status:</label>
            <select name="bookStockStatusIds" multiple defaultValue={bookStockStatusIds}>
              {
                bookStockStatuses
                  ?
                  bookStockStatuses.map((e: any) => <option selected={bookStockStatusIds ? bookStockStatusIds.includes(e.id.toString()) : false} value={e.id}>{e.name}</option>)
                  :
                  <></>
              }
            </select>
          </div>
          <div>
            <label>memo:</label>
            <input type="text" name="memo" defaultValue={memo}></input>
          </div>
          <div>
            <button type="submit">検索</button>
          </div>
        </div>
      </form>
      <Table
        linkTo="bookStocks"
        headerInfo={[
          {
            name: "Id",
            onClick: () => {
              const newUrl = updateOrder(currentPath, queryParams, sort, "id")
              navigate(newUrl)
            }
          },
          {
            name: "Book Name",
            onClick: () => {
              const newUrl = updateOrder(currentPath, queryParams, sort, "book_master.name")
              navigate(newUrl)
            }
          },
          {
            name: "Status",
            onClick: () => {
              const newUrl = updateOrder(currentPath, queryParams, sort, "book_stock_status.name")
              navigate(newUrl)
            }
          },
          {
            name: "Memo",
            onClick: () => {
              const newUrl = updateOrder(currentPath, queryParams, sort, "book_master.memo")
              navigate(newUrl)
            }
          },
        ]}
        contentInfo={[
          { getValueFunc: (row: any) => row.id },
          { getValueFunc: (row: any) => row.bookMaster.name },
          { getValueFunc: (row: any) => row.bookStockStatus.name },
          { getValueFunc: (row: any) => row.memo },
        ]}
        content={bookStocks}
      />
      <Link to="/">トップに戻る</Link>
    </>
  )
}
