import { useEffect, useState } from "react";
import { BASE_URL } from "../../config";
import { CustomerSearchControllerApiFactory, Configuration } from "../../api";
import { Table } from "../../components/Table/Table";
import { useLocation, Link, useNavigate } from "react-router";
import queryString from "query-string";
import { updateOrder } from "../../util/util";

type customersPageProps = {
};

export const CustomersPage: React.FC<customersPageProps> = ({ }) => {
  const currentPath = location.pathname
  const navigate = useNavigate();

  const [customers, setcustomers] = useState<any[] | undefined>([])

  const search = useLocation().search;
  const queryParams = queryString.parse(search);
  const id: any = queryParams['id'];
  const name: any = queryParams['name'];
  const emailAddress: any = queryParams['emailAddress'];
  const sort: any = queryParams['sort'];
  const page: any = queryParams['page'];
  const size: any = queryParams['size'];

  useEffect(() => {
    (async () => {
      const customerApiFactory =  CustomerSearchControllerApiFactory(new Configuration(), BASE_URL);
      const customersResult = await customerApiFactory.executeSearchCustomerGet({
        name: page ? name : undefined,
        emailAddress: emailAddress ? emailAddress : undefined,
        page: page ? page : undefined,
        size: size ? size : undefined,
        sort: sort ? sort : undefined,
      })
      console.log(customersResult);
      const customersData = customersResult.data;
      console.log(customersData);
      setcustomers(customersData._embedded?.customers);
    })();
  }, [search]);

  return (
    <>
      <Link to="/customers/create">新規登録</Link>
      {/* TODO: ページ遷移せずに、 search の更新だけを行うように修正 */}
      <form action="/customers">
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
            <label>Email address:</label>
            <input type="text" name="emailAddress" defaultValue={emailAddress}></input>
          </div>
          <div>
            <button type="submit">検索</button>
          </div>
        </div>
      </form>
      <Table
        linkTo="customers"
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
            name: "Email address",
            onClick: () => {
              const newUrl = updateOrder(currentPath, queryParams, sort, "emailAddress")
              navigate(newUrl)
            }
          },
        ]}
        contentInfo={[
          { getValueFunc: (row: any) => row.id },
          { getValueFunc: (row: any) => row.name },
          { getValueFunc: (row: any) => row.number },
          { getValueFunc: (row: any) => row.emailAddress },
        ]}
        content={customers}
      />
      <Link to="/">トップに戻る</Link>
    </>
  )
}
