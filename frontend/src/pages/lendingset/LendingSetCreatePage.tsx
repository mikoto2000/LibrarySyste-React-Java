import { useEffect, useState } from "react";
import { LendingStatusEntityControllerApiFactory, LendingSetEntityControllerApiFactory, Configuration, EntityModelCustomer, CustomerEntityControllerApiFactory, EntityModelLendingStatus, BookStockSearchControllerApiFactory, EntityModelBookStock } from "../../api";
import { BASE_URL } from "../../config";
import { Link, useNavigate } from "react-router";

type LendingSetCreatePageProps = {
};

export const LendingSetCreatePage: React.FC<LendingSetCreatePageProps> = ({ }) => {

  const navigate = useNavigate();
  const [lendingStatuses, setLendingStatuses] = useState<EntityModelLendingStatus[] | undefined>([]);
  const [customers, setNdcCategories] = useState<EntityModelCustomer[] | undefined>([]);
  const [bookStock, setBookStock] = useState<EntityModelBookStock[] | undefined>([]);

  useEffect(() => {
    (async () => {
      const customerApi = CustomerEntityControllerApiFactory(new Configuration(), BASE_URL);
      const customerResult = await customerApi.getCollectionResourceCustomerGet({});
      setNdcCategories(customerResult.data._embedded?.customers);

      const lendingStatusApi = LendingStatusEntityControllerApiFactory(new Configuration(), BASE_URL);
      const lendingStatusResult = await lendingStatusApi.getCollectionResourceLendingstatusGet({});
      setLendingStatuses(lendingStatusResult.data._embedded?.lendingStatuses);

      const bookStockSearchApi = BookStockSearchControllerApiFactory(new Configuration(), BASE_URL);
      const bookStockResult = await bookStockSearchApi.executeSearchBookstockGet({
        bookStockStatusIds: [1]
      });
      setBookStock(bookStockResult.data._embedded?.bookStocks);
    })();
  }, []);

  const handleSubmitClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    console.log(event);
    const form: any = event.currentTarget.form;
    console.log(form);
    const lendStartDate = form.lendStartDate.value
    const lendDeadlineDate = form.lendDeadlineDate.value
    const returnDate = form.returnDate.value
    const lendingStatus = form.lendingStatus.value
    const memo = form.memo.value
    console.log(lendingStatus);
    const customer = form.customer.value;

    const api = LendingSetEntityControllerApiFactory(new Configuration(), BASE_URL);

    console.log(JSON.stringify({
      lendingSetRequestBody: {
        lendStartDate,
        lendDeadlineDate,
        returnDate,
        lendingStatus,
        customer,
        memo
      }
    }));


    api.postCollectionResourceLendingsetPost({
      lendingSetRequestBody: {
        lendStartDate,
        lendDeadlineDate,
        returnDate,
        lendingStatus,
        customer,
        memo
      }
    }).then((result) => {
      navigate(`/lendingSets/${(result.data as any).id}`);
    });

  }

  return (
    <>
      <form name="register">
        <div>
          <div>
            <label>Customer:</label>
            <select name="customer">
              {
                customers
                  ?
                  customers.map((e: any) => <option value={"/customer/" + e.id}>{e.name}</option>)
                  :
                  <></>
              }
            </select>
          </div>
          <div>
            <label>Book Stock:</label>
            <select name="bookStock" multiple>
              {
                bookStock
                  ?
                  bookStock.map((e: any) => <option value={"/bookStock/" + e.id}>{e.bookMaster.name}</option>)
                  :
                  <></>
              }
            </select>
          </div>
          <div>
            <label>Lending Start Date:</label>
            <input type="date" name="lendStartDate"></input>
          </div>
          <div>
            <label>Lending Deadline Date:</label>
            <input type="date" name="lendDeadlineDate"></input>
          </div>
          <div>
            <label>Return Date:</label>
            <input type="date" name="returnDate"></input>
          </div>
          <div>
            <label>LendingStatus:</label>
            <select name="lendingStatus">
              {
                lendingStatuses
                  ?
                  lendingStatuses.map((e: any) => <option value={"/LendingStatus/" + e.id}>{e.name}</option>)
                  :
                  <></>
              }
            </select>
          </div>
          <div>
            <label>Memo:</label>
            <input type="text" name="memo"></input>
          </div>
          <div>
            <button type="submit" onClick={handleSubmitClick}>登録</button>
          </div>
        </div>
      </form>
      <Link to="/lendingSets">一覧に戻る</Link>
    </>
  )
}
