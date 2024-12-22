import { Configuration, NdcCategoryEntityControllerApiFactory } from "../../api";
import { BASE_URL } from "../../config";
import { Link, useNavigate } from "react-router";

type NdcCategoryCreatePageProps = {
};

export const NdcCategoryCreatePage: React.FC<NdcCategoryCreatePageProps> = ({ }) => {

  const navigate = useNavigate();

  const handleSubmitClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    console.log(event);
    const form: any = event.currentTarget.form;
    console.log(form);
    const name = form.name.value;
    const number = form.number.value;

    const api = NdcCategoryEntityControllerApiFactory(new Configuration(), BASE_URL);

    console.log(JSON.stringify({
      ndcCategoryRequestBody: {
        name,
        number,
      }
    }));


    api.postCollectionResourceNdccategoryPost({
      ndcCategoryRequestBody: {
        name,
        number,
      }
    }).then((result) => {
      navigate(`/ndcCategories/${(result.data as any).id}`);
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
            <label>Number:</label>
            <input type="text" name="number"></input>
          </div>
          <div>
            <button type="submit" onClick={handleSubmitClick}>登録</button>
          </div>
        </div>
      </form>
      <Link to="/ndcCategories">一覧に戻る</Link>
    </>
  )
}

