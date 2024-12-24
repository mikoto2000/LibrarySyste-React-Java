import { useEffect, useState } from "react";
import { BookMasterEntityControllerApiFactory, BookStockEntityControllerApiFactory, BookStockStatusEntityControllerApiFactory, Configuration, EntityModelBookMaster, EntityModelBookStockStatus } from "../../api";
import { BASE_URL } from "../../config";
import { Link, useNavigate } from "react-router";

type BookStockCreatePageProps = {
};

export const BookStockCreatePage: React.FC<BookStockCreatePageProps> = ({ }) => {

  const navigate = useNavigate();
  const [bookMasters, setBookMasters] = useState<EntityModelBookMaster[] | undefined>([]);
  const [bookStockStatuses, setBookStockStatuses] = useState<EntityModelBookStockStatus[] | undefined>([]);

  useEffect(() => {
    (async () => {
      // BookMaster の一覧取得
      const bookMasterControllerApiFactory = BookMasterEntityControllerApiFactory(new Configuration(), BASE_URL);
      const bookMastersResult = await bookMasterControllerApiFactory.getCollectionResourceBookmasterGet();
      setBookMasters(bookMastersResult.data._embedded?.bookMasters);

      // BookStockStatus の一覧取得
      const bookStockStatusControllerApiFactory = BookStockStatusEntityControllerApiFactory(new Configuration(), BASE_URL);
      const bookStockStatussResult = await bookStockStatusControllerApiFactory.getCollectionResourceBookstockstatusGet();
      setBookStockStatuses(bookStockStatussResult.data._embedded?.bookStockStatuses);
    })();
  }, []);

  const handleSubmitClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    console.log(event);
    const form: any = event.currentTarget.form;
    console.log(form);
    const bookMaster = form.bookMaster.value
    const bookStockStatus = form.bookStockStatus.value
    const memo = form.memo.value

    const api = BookStockEntityControllerApiFactory(new Configuration(), BASE_URL);

    console.log(JSON.stringify({
      bookStockRequestBody: {
        bookMaster,
        bookStockStatus,
        memo,
      }
    }));


    api.postCollectionResourceBookstockPost({
      bookStockRequestBody: {
        bookMaster,
        bookStockStatus,
        memo,
      }
    }).then((result) => {
      navigate(`/bookStocks/${(result.data as any).id}`);
    });

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
                  bookMasters.map((e: any) => <option value={"/bookMaster/" + e.id}>{e.name}</option>)
                  :
                  <></>
              }
            </select>
          </div>
          <div>
            <label>Book Master:</label>
            <select name="bookStockStatus">
              {
                bookStockStatuses
                  ?
                  bookStockStatuses.map((e: any) => <option value={"/bookStockStatus/" + e.id}>{e.name}</option>)
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
