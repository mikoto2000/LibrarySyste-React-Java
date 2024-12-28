import { useEffect, useMemo, useState } from "react";
import { BookMasterEntityControllerApiFactory, BookStockEntityControllerApiFactory, BookStockStatusEntityControllerApiFactory, Configuration, EntityModelBookMaster, EntityModelBookStock, EntityModelBookStockStatus } from "../../api";
import { BASE_URL } from "../../config";
import { Link, useNavigate, useParams } from "react-router";

type BookStockCreatePageProps = {
};

export const BookStockEditPage: React.FC<BookStockCreatePageProps> = ({ }) => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [bookStock, setBookStock] = useState<EntityModelBookStock | undefined>();
  const [bookMasters, setBookMasters] = useState<EntityModelBookMaster[] | undefined>([]);
  const [bookStockStatuses, setBookStockStatuses] = useState<EntityModelBookStockStatus[] | undefined>([]);

  const api = useMemo(() => BookStockEntityControllerApiFactory(new Configuration(), BASE_URL), []);

  useEffect(() => {
    (async () => {

      if (id) {
        const bookStockResult = await api.getItemResourceBookstockGet({
          id
        });
        setBookStock(bookStockResult.data)

        // BookMaster の一覧取得
        const bookMasterControllerApiFactory = BookMasterEntityControllerApiFactory(new Configuration(), BASE_URL);
        const bookMastersResult = await bookMasterControllerApiFactory.getCollectionResourceBookmasterGet();
        setBookMasters(bookMastersResult.data._embedded?.bookMasters);

        // BookStockStatus の一覧取得
        const bookStockStatusControllerApiFactory = BookStockStatusEntityControllerApiFactory(new Configuration(), BASE_URL);
        const bookStockStatussResult = await bookStockStatusControllerApiFactory.getCollectionResourceBookstockstatusGet();
        setBookStockStatuses(bookStockStatussResult.data._embedded?.bookStockStatuses);
      }
    })();
  }, []);

  const handleSubmitClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    if (id) {
      console.log(event);
      const form: any = event.currentTarget.form;
      console.log(form);
      const bookMaster = form.bookMaster.value
      const bookStockStatus = form.bookStockStatus.value
      const memo = form.memo.value

      console.log(JSON.stringify({
        bookStockRequestBody: {
          bookMaster,
          bookStockStatus,
          memo,
        }
      }));

      api.patchItemResourceBookstockPatch({
        id,
        bookStockRequestBody: {
          bookMaster,
          bookStockStatus,
          memo,
        }
      }).then((result) => {
        navigate(`/bookStocks/${(result.data as any).id}`);
      });
    }

  }

  return (
    <>
      <form name="register">
        <div>
          <div>
            <label>Book Master:</label>
            <select name="bookMaster">
              {
                bookMasters
                  ?
                  bookMasters.map((e: any) => <option selected={e.id === (bookStock as any)._embedded.bookMaster.id} value={"/bookMaster/" + e.id}>{e.name}</option>)
                  :
                  <></>
              }
            </select>
          </div>
          <div>
            <label>Book Stock Status:</label>
            <select name="bookStockStatus">
              {
                bookStockStatuses
                  ?
                  bookStockStatuses.map((e: any) => <option selected={e.id === (bookStock as any)._embedded.bookStockStatus.id} value={"/bookStockStatus/" + e.id}>{e.name}</option>)
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
      <Link to="/bookStocks">一覧に戻る</Link>
    </>
  )
}

