import { useEffect, useState } from "react";
import { BASE_URL } from "../../config";
import { LendingStatusSearchControllerApiFactory, Configuration } from "../../api";
import { Table } from "../../components/Table/Table";
import { useLocation, Link, useNavigate } from "react-router";
import queryString from "query-string";
import { updateOrder } from "../../util/util";

type lendingStatusesPageProps = {
};

export const LendingStatusesPage: React.FC<lendingStatusesPageProps> = ({ }) => {
  const currentPath = location.pathname
  const navigate = useNavigate();

  const [lendingStatuses, setlendingStatuses] = useState<any[] | undefined>([])

  const search = useLocation().search;
  const queryParams = queryString.parse(search);
  const id: any = queryParams['id'];
  const name: any = queryParams['name'];
  const sort: any = queryParams['sort'];
  const page: any = queryParams['page'];
  const size: any = queryParams['size'];

  useEffect(() => {
    (async () => {
      const lendingStatusApiFactory =  LendingStatusSearchControllerApiFactory(new Configuration(), BASE_URL);
      const lendingStatusesResult = await lendingStatusApiFactory.executeSearchLendingstatusGet({
        name: page ? name : undefined,
        page: page ? page : undefined,
        size: size ? size : undefined,
        sort: sort ? sort : undefined,
      })
      console.log(lendingStatusesResult);
      const lendingStatusesData = lendingStatusesResult.data;
      console.log(lendingStatusesData);
      setlendingStatuses(lendingStatusesData._embedded?.lendingStatuses);
    })();
  }, [search]);

  return (
    <>
      <Link to="/lendingStatuses/create">新規登録</Link>
      {/* TODO: ページ遷移せずに、 search の更新だけを行うように修正 */}
      <form action="/lendingStatuses">
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
        linkTo="lendingStatuses"
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
        content={lendingStatuses}
      />
      <Link to="/">トップに戻る</Link>
    </>
  )
}

