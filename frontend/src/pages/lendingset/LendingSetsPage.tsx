import { useEffect, useState } from "react";
import { BASE_URL } from "../../config";
import { EchoControllerApiFactory, Configuration, LendingStatusEntityControllerApiFactory } from "../../api";
import { Table } from "../../components/Table/Table";
import { Link, useLocation, useNavigate } from "react-router";
import queryString from "query-string";
import { updateOrder } from "../../util/util";

type LendingSetsPageProps = {
};

export const LendingSetsPage: React.FC<LendingSetsPageProps> = ({ }) => {

  const [lendingSets, setLendingSets] = useState<any[] | undefined>([])
  const [lendingStatuses, setLendingStatuses] = useState<any[] | undefined>([])

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname
  const search = location.search;
  const queryParams = queryString.parse(search);
  const id: any = queryParams['id'];
  const lendingStatusIds: any = queryParams['lendingStatusIds'];
  const bookName: any = queryParams['book_name'];
  const customerName: any = queryParams['customer_name'];
  const lendStartDateBegin: any = queryParams['lendStartDateBegin'];
  const lendStartDateEnd: any = queryParams['lendStartDateEnd'];
  const lendDeadlineDateBegin: any = queryParams['lendDeadlineBegin'];
  const lendDeadlineDateEnd: any = queryParams['lendDeadlineDateEnd'];
  const returnDateBegin: any = queryParams['returnBegin'];
  const returnDateEnd: any = queryParams['returnDateEnd'];
  const memo: any = queryParams['memo'];
  const sort: any = queryParams['sort'];
  const page: any = queryParams['page'];
  const size: any = queryParams['size'];

  useEffect(() => {
    (async () => {

      const lendingSetApiFactory = EchoControllerApiFactory(new Configuration(), BASE_URL);
      const lendingSetsResult = await lendingSetApiFactory.searchLendingSet({
        id: id ? id : undefined,
        lendingStatusIds: lendingStatusIds ? lendingStatusIds : undefined,
        bookName: bookName ? bookName : undefined,
        customerName: customerName ? customerName : undefined,
        lendStartDateBegin: lendStartDateBegin ? lendStartDateBegin : undefined,
        lendStartDateEnd: lendStartDateEnd ? lendStartDateEnd : undefined,
        lendDeadlineDateBegin: lendDeadlineDateBegin ? lendDeadlineDateBegin : undefined,
        lendDeadlineDateEnd: lendDeadlineDateEnd ? lendDeadlineDateEnd : undefined,
        returnDateBegin: returnDateBegin ? returnDateBegin : undefined,
        returnDateEnd: returnDateEnd ? returnDateEnd : undefined,
        memo: memo ? memo : undefined,
        page: page ? page : undefined,
        size: size ? size : undefined,
        sort: sort ? sort : undefined,
      });
      console.log(lendingSetsResult);
      const lendingSetsData = lendingSetsResult.data;
      console.log(lendingSetsData);

      setLendingSets(lendingSetsData?.content);

      console.log(lendingSetsData?.content);

      const lendingStatusApi = LendingStatusEntityControllerApiFactory(new Configuration(), BASE_URL);
      const lendingStatusResult = await lendingStatusApi.getCollectionResourceLendingstatusGet({});
      setLendingStatuses(lendingStatusResult.data._embedded?.lendingStatuses);

    })();
  }, [search]);


  return (
    <>
      <Link to="/lendingSets/create">新規登録</Link>
      {/* TODO: ページ遷移せずに、 search の更新だけを行うように修正 */}
      <form action="/lendingSets">
      <div>
        <div>
          <label>Id:</label>
          <input type="number" name="id" defaultValue={id}></input>
        </div>
        <div>
          <label>Book Name:</label>
          <input type="text" name="book_name" defaultValue={bookName}></input>
        </div>
        <div>
          <label>Customer Name:</label>
          <input type="text" name="customer_name" defaultValue={customerName}></input>
        </div>
          <div>
            <label>Status:</label>
            <select name="lendingStatusIds" multiple defaultValue={lendingStatusIds}>
              {
                lendingStatuses
                  ?
                  lendingStatuses.map((e: any) => <option selected={lendingStatusIds ? lendingStatusIds.includes(e.id.toString()) : false} value={e.id}>{e.name}</option>)
                  :
                  <></>
              }
            </select>
          </div>
        <div>
          <label>Lend Start Date:</label>
          <input type="date" name="lendStartDateBegin" defaultValue={lendStartDateBegin}></input>
          ～
          <input type="date" name="lendStartDateEnd" defaultValue={lendStartDateEnd}></input>
        </div>
        <div>
          <label>Lend Deadline Date:</label>
          <input type="date" name="lendDeadlineDateBegin" defaultValue={lendDeadlineDateBegin}></input>
          ～
          <input type="date" name="lendDeadlineDateEnd" defaultValue={lendDeadlineDateEnd}></input>
        </div>
        <div>
          <label>Return Date:</label>
          <input type="date" name="returnDateBegin" defaultValue={returnDateBegin}></input>
          ～
          <input type="date" name="returnDateEnd" defaultValue={returnDateEnd}></input>
        </div>
        <div>
          <label>Memo:</label>
          <input type="text" name="memo" defaultValue={memo}></input>
        </div>
        <div>
        <button type="submit">検索</button>
        </div>
      </div>
      </form>
      <Table
        linkTo="lendingSets"
        headerInfo={[
          {
            name: "Id",
            onClick: () => {
              const newUrl = updateOrder(currentPath, queryParams, sort, "id")
              navigate(newUrl)
            }
          },
          {
            name: "Customer Name",
            onClick: () => {
              const newUrl = updateOrder(currentPath, queryParams, sort, "customer_name")
              navigate(newUrl)
            }
          },
          {
            name: "Lending Status",
            onClick: () => {
              const newUrl = updateOrder(currentPath, queryParams, sort, "status.name")
              navigate(newUrl)
            }
          },
          {
            name: "Book Name",
            onClick: () => {
              const newUrl = updateOrder(currentPath, queryParams, sort, "book_name")
              navigate(newUrl)
            }
          },
          {
            name: "Lend Start Date",
            onClick: () => {
              const newUrl = updateOrder(currentPath, queryParams, sort, "lend_start_date")
              navigate(newUrl)
            }
          },
          {
            name: "Lend Deadline Date",
            onClick: () => {
              const newUrl = updateOrder(currentPath, queryParams, sort, "lend_deadline_date")
              navigate(newUrl)
            }
          },
          {
            name: "Return Date",
            onClick: () => {
              const newUrl = updateOrder(currentPath, queryParams, sort, "return_date")
              navigate(newUrl)
            }
          },
          {
            name: "Memo",
            onClick: () => {
              const newUrl = updateOrder(currentPath, queryParams, sort, "memo")
              navigate(newUrl)
            }
          },
        ]}
        contentInfo={[
          { getValueFunc: (row: any) => row.id },
          { getValueFunc: (row: any) => row.customer_name },
          { getValueFunc: (row: any) => row.lending_status },
          { getValueFunc: (row: any) => row.book_name },
          { getValueFunc: (row: any) => row.lend_start_date },
          { getValueFunc: (row: any) => row.lend_deadline_date },
          { getValueFunc: (row: any) => row.return_date },
          { getValueFunc: (row: any) => row.memo },
        ]}
        content={lendingSets}
      />
      <Link to="/">トップに戻る</Link>
    </>
  )
}
