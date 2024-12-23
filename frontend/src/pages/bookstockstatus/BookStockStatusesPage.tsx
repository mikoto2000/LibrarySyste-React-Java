import { useEffect, useState } from "react";
import { BASE_URL } from "../../config";
import { BookStockStatusSearchControllerApiFactory, Configuration } from "../../api";
import { Table } from "../../components/Table/Table";
import { useLocation, Link, useNavigate } from "react-router";
import queryString from "query-string";
import { updateOrder } from "../../util/util";

type bookStockStatusesPageProps = {
};

export const BookStockStatusesPage: React.FC<bookStockStatusesPageProps> = ({ }) => {
  const currentPath = location.pathname
  const navigate = useNavigate();

  const [bookStockStatuses, setbookStockStatuses] = useState<any[] | undefined>([])

  const search = useLocation().search;
  const queryParams = queryString.parse(search);
  const id: any = queryParams['id'];
  const name: any = queryParams['name'];
  const sort: any = queryParams['sort'];
  const page: any = queryParams['page'];
  const size: any = queryParams['size'];

  useEffect(() => {
    (async () => {
      const bookStockStatusApiFactory =  BookStockStatusSearchControllerApiFactory(new Configuration(), BASE_URL);
      const bookStockStatusesResult = await bookStockStatusApiFactory.executeSearchBookstockstatusGet({
        name: page ? name : undefined,
        page: page ? page : undefined,
        size: size ? size : undefined,
        sort: sort ? sort : undefined,
      })
      console.log(bookStockStatusesResult);
      const bookStockStatusesData = bookStockStatusesResult.data;
      console.log(bookStockStatusesData);
      setbookStockStatuses(bookStockStatusesData._embedded?.bookStockStatuses);
    })();
  }, [search]);

  return (
    <>
      <Link to="/bookStockStatuses/create">新規登録</Link>
      {/* TODO: ページ遷移せずに、 search の更新だけを行うように修正 */}
      <form action="/bookStockStatuses">
        <div>
          <div>
            <label>Id:</label>
            <input type="number" name="id" defaultValue={id}></input>
          </div>
          <div>
            <label>Name:</label>
            <input type="text" name="name" defaultValue={name}></input>
          </div>
          <div>
            <button type="submit">検索</button>
          </div>
        </div>
      </form>
      <Table
        linkTo="bookStockStatuses"
        headerInfo={[
          {
            name: "Id",
            onClick: () => {
              const newUrl = updateOrder(currentPath, queryParams, sort, "id")
              navigate(newUrl)
            }
          },
          {
            name: "Name",
            onClick: () => {
              const newUrl = updateOrder(currentPath, queryParams, sort, "name")
              navigate(newUrl)
            }
          },
        ]}
        contentInfo={[
          { getValueFunc: (row: any) => row.id },
          { getValueFunc: (row: any) => row.name },
          { getValueFunc: (row: any) => row.number },
        ]}
        content={bookStockStatuses}
      />
      <Link to="/">トップに戻る</Link>
    </>
  )
}

