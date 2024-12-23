import { useMemo } from "react";
import { Configuration, BookStockStatusEntityControllerApiFactory } from "../../api";
import { BASE_URL } from "../../config";
import { Link, useNavigate } from "react-router";

type BookStockStatusCreatePageProps = {
};

export const BookStockStatusCreatePage: React.FC<BookStockStatusCreatePageProps> = ({ }) => {

  const navigate = useNavigate();

  const api = useMemo(() => BookStockStatusEntityControllerApiFactory(new Configuration(), BASE_URL), []);

  const handleSubmitClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    console.log(event);
    const form: any = event.currentTarget.form;
    console.log(form);
    const name = form.name.value;

    console.log(JSON.stringify({
      ndcCategoryRequestBody: {
        name,
      }
    }));


    api.postCollectionResourceBookstockstatusPost({
      bookStockStatusRequestBody: {
        name,
      }
    }).then((result) => {
      navigate(`/bookStockStatuses/${(result.data as any).id}`);
    });

  }

  return (
    <>
      <form name="register">
        <div>
          <div>
            <label>Name:</label>
            <input type="text" name="name"></input>
          </div>
          <div>
            <button type="submit" onClick={handleSubmitClick}>登録</button>
          </div>
        </div>
      </form>
      <Link to="/bookStockStatuses">一覧に戻る</Link>
    </>
  )
}

