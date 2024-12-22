import { useEffect, useState } from "react";
import { BASE_URL } from "../../config";
import { NdcCategorySearchControllerApiFactory, Configuration } from "../../api";
import { Table } from "../../components/Table/Table";
import { useLocation, Link, useNavigate } from "react-router";
import queryString from "query-string";
import { updateOrder } from "../../util/util";

type ndcCategoriesPageProps = {
};

export const NdcCategoriesPage: React.FC<ndcCategoriesPageProps> = ({ }) => {
  const currentPath = location.pathname
  const navigate = useNavigate();

  const [ndcCategories, setndcCategories] = useState<any[] | undefined>([])

  const search = useLocation().search;
  const queryParams = queryString.parse(search);
  const id: any = queryParams['id'];
  const name: any = queryParams['name'];
  const number: any = queryParams['number'];
  const sort: any = queryParams['sort'];
  const page: any = queryParams['page'];
  const size: any = queryParams['size'];

  useEffect(() => {
    (async () => {
      const ndcCategoryApiFactory =  NdcCategorySearchControllerApiFactory(new Configuration(), BASE_URL);
      const ndcCategoriesResult = await ndcCategoryApiFactory.executeSearchNdccategoryGet({
        name: page ? name : undefined,
        number: number ? number : undefined,
        page: page ? page : undefined,
        size: size ? size : undefined,
        sort: sort ? sort : undefined,
      })
      console.log(ndcCategoriesResult);
      const ndcCategoriesData = ndcCategoriesResult.data;
      console.log(ndcCategoriesData);
      setndcCategories(ndcCategoriesData._embedded?.ndcCategories);
    })();
  }, [search]);

  return (
    <>
      <Link to="/ndcCategories/create">新規登録</Link>
      {/* TODO: ページ遷移せずに、 search の更新だけを行うように修正 */}
      <form action="/ndcCategories">
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
            <label>Number:</label>
            <input type="text" name="number" defaultValue={number}></input>
          </div>
          <div>
            <button type="submit">検索</button>
          </div>
        </div>
      </form>
      <Table
        linkTo="ndcCategories"
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
          {
            name: "Number",
            onClick: () => {
              const newUrl = updateOrder(currentPath, queryParams, sort, "number")
              navigate(newUrl)
            }
          },
        ]}
        contentInfo={[
          { getValueFunc: (row: any) => row.id },
          { getValueFunc: (row: any) => row.name },
          { getValueFunc: (row: any) => row.number },
        ]}
        content={ndcCategories}
      />
      <Link to="/">トップに戻る</Link>
    </>
  )
}
