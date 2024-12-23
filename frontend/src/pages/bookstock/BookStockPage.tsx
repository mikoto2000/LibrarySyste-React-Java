import { useEffect, useState } from "react";
import { BASE_URL } from "../../config";
import { Configuration, BookStockSearchControllerApiFactory } from "../../api";
import { Table } from "../../components/Table/Table";
import { Link, useLocation, useNavigate } from "react-router";
import queryString from "query-string";
import { updateOrder } from "../../util/util";

type BookStocksPageProps = {
};

export const BookStocksPage: React.FC<BookStocksPageProps> = ({ }) => {

  const [bookStocks, setBookStocks] = useState<any[] | undefined>([])

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname
  const search = location.search;
  const queryParams = queryString.parse(search);
  const id: any = queryParams['id'];
  const status: any = queryParams['status'];
  const sort: any = queryParams['sort'];
  const page: any = queryParams['page'];
  const size: any = queryParams['size'];

  useEffect(() => {
    (async () => {

      const bookStockApiFactory = BookStockSearchControllerApiFactory(new Configuration(), BASE_URL);
      const bookStocksResult = await bookStockApiFactory.executeSearchBookstockGet({
        id: id ? id : undefined,
        page: page ? page : undefined,
        size: size ? size : undefined,
        sort: sort ? sort : undefined,
      });
      console.log(bookStocksResult);
      const bookStocksData = bookStocksResult.data;
      console.log(bookStocksData);

      setBookStocks(bookStocksData?._embedded?.bookStocks);

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
          {/* 本の題名で検索 */}
          <div>
            <label>Status:</label>
            <input type="text" name="status" defaultValue={status}></input>
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
        ]}
        contentInfo={[
          { getValueFunc: (row: any) => row.id },
          { getValueFunc: (row: any) => row.bookMaster.name },
          { getValueFunc: (row: any) => row.bookStockStatus.name },
        ]}
        content={bookStocks}
      />
      <Link to="/">トップに戻る</Link>
    </>
  )
}
