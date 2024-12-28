import { useEffect, useMemo, useState } from "react";
import { LendingStatusEntityControllerApiFactory, LendingSetEntityControllerApiFactory, Configuration, EntityModelCustomer, CustomerEntityControllerApiFactory, EntityModelLendingStatus, BookStockSearchControllerApiFactory, EntityModelBookStock, EntityModelLendingSet, LendingSetPropertyReferenceControllerApiFactory, CollectionModelBookStock } from "../../api";
import { BASE_URL } from "../../config";
import { Link, useNavigate, useParams } from "react-router";

type LendingSetCreatePageProps = {
};

export const LendingSetEditPage: React.FC<LendingSetCreatePageProps> = ({ }) => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [lendingSet, setLendingSet] = useState<EntityModelLendingSet | undefined>();
  const [propertyBookStock, setPropertyBookStock] = useState<CollectionModelBookStock | undefined>();

  const [lendingStatuses, setLendingStatuses] = useState<EntityModelLendingStatus[] | undefined>([]);
  const [customers, setNdcCategories] = useState<EntityModelCustomer[] | undefined>([]);
  const [bookStock, setBookStock] = useState<EntityModelBookStock[] | undefined>([]);

  const api = useMemo(() => LendingSetEntityControllerApiFactory(new Configuration(), BASE_URL), []);
  const propertyApi = useMemo(() => LendingSetPropertyReferenceControllerApiFactory(new Configuration(), BASE_URL), []);

  useEffect(() => {
    (async () => {
      if (id) {
        const lendingSetResult = await api.getItemResourceLendingsetGet({
          id
        });
        setLendingSet(lendingSetResult.data)

        setPropertyBookStock((await propertyApi.followPropertyReferenceLendingsetGet({id})).data);

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
      }
    })();
  }, []);

  const handleSubmitClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    if (id) {
      console.log(event);
      const form: any = event.currentTarget.form;
      console.log(form);
      const bookStockOptions = form.bookStock.options
      const bookStocks = [];
      for (var i = 0; i < bookStockOptions.length; i++) {
        console.log(bookStockOptions[i].selected);
        if (bookStockOptions[i].selected === true) {
          bookStocks.push(bookStockOptions[i].value)
        }
      }
      console.log(bookStocks);
      const lendStartDate = form.lendStartDate.value
      const lendDeadlineDate = form.lendDeadlineDate.value
      const returnDate = form.returnDate.value
      const lendingStatus = form.lendingStatus.value
      const memo = form.memo.value
      console.log(lendingStatus);
      const customer = form.customer.value;

      console.log(JSON.stringify({
        lendingSetRequestBody: {
          bookStock: bookStocks,
          lendStartDate,
          lendDeadlineDate,
          returnDate,
          lendingStatus,
          customer,
          memo
        }
      }));

      api.patchItemResourceLendingsetPatch({
        id,
        lendingSetRequestBody: {
          bookStock: bookStocks,
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
  }

  return (
    <>
      {
        lendingSet
          ?
          <form name="register">
            <div>
              <div>
                <label>Id:</label>
                <input type="text" name="id" readOnly defaultValue={id} ></input>
              </div>
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
                    propertyBookStock?._embedded?.bookStocks
                      ?
                      propertyBookStock?._embedded?.bookStocks.map((e: any) => <option selected value={"/bookStock/" + e.id}>{e.bookMaster.name}</option>)
                      :
                      <></>
                  }
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
                <input type="date" name="lendStartDate" defaultValue={lendingSet.lendStartDate}></input>
              </div>
              <div>
                <label>Lending Deadline Date:</label>
                <input type="date" name="lendDeadlineDate" defaultValue={lendingSet.lendDeadlineDate}></input>
              </div>
              <div>
                <label>Return Date:</label>
                <input type="date" name="returnDate" defaultValue={lendingSet.returnDate}></input>
              </div>
              <div>
                <label>LendingStatus:</label>
                <select name="lendingStatus">
                  {
                    lendingStatuses
                      ?
                      lendingStatuses.map((e: any) => <option selected={(lendingSet as any)._embedded.lendingStatus.id === e.id} value={"/LendingStatus/" + e.id}>{e.name}</option>)
                      :
                      <></>
                  }
                </select>
              </div>
              <div>
                <label>Memo:</label>
                <input type="text" name="memo" defaultValue={lendingSet.memo}></input>
              </div>
              <div>
                <button type="submit" onClick={handleSubmitClick}>登録</button>
              </div>
            </div>
          </form>
          :
          <></>
      }
      <Link to={`/lendingSets/${id}`}>詳細に戻る</Link>
      <Link to="/lendingSets">一覧に戻る</Link>
    </>
  )
}

