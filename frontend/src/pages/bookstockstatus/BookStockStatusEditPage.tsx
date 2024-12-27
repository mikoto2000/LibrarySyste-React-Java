import { useEffect, useMemo, useState } from "react";
import { Configuration, EntityModelBookStockStatus, BookStockStatusEntityControllerApiFactory } from "../../api";
import { BASE_URL } from "../../config";
import { Link, useNavigate, useParams } from "react-router";

type BookStockStatusEditPageProps = {
};

export const BookStockStatusEditPage: React.FC<BookStockStatusEditPageProps> = ({ }) => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [bookStockStatus, setBookStockStatus] = useState<EntityModelBookStockStatus | undefined>(undefined);

  const api = useMemo(() => BookStockStatusEntityControllerApiFactory(new Configuration(), BASE_URL), []);

  useEffect(() => {
    (async () => {
      if (id) {
        const bookStockStatusResult = await api.getItemResourceBookstockstatusGet({
          id
        });
        setBookStockStatus(bookStockStatusResult.data)
      }
    })();

  }, [])

  const handleSubmitClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    if (!id) {
      return;
    }
    console.log(event);
    const form: any = event.currentTarget.form;
    console.log(form);
    const name = form.name.value;
    const number = form.number.value;

    console.log(JSON.stringify({
      bookStockStatusRequestBody: {
        name,
        number,
      }
    }));


    api.patchItemResourceBookstockstatusPatch({
      id,
      bookStockStatusRequestBody: {
        id: Number(id),
        name,
      }
    }).then((result) => {
      navigate(`/ndcCategories/${(result.data as any).id}`);
    });

  }

  return (
    <>
      {
        bookStockStatus
          ?
          <form name="register">
            <div>
              <div>
                <label>id:</label>
                <input type="text" name="id" value={id} readOnly></input>
              </div>
              <div>
                <label>Name:</label>
                <input type="text" name="name" defaultValue={bookStockStatus?.name}></input>
              </div>
              <div>
                <button type="submit" onClick={handleSubmitClick}>変更</button>
              </div>
            </div>
          </form>
          :
          <p>表示できるアイテムがありません。</p>
      }
      <Link to={`/ndcCategories/${id}`}>詳細に戻る</Link>
      <Link to="/ndcCategories">一覧に戻る</Link>
    </>
  )
}



