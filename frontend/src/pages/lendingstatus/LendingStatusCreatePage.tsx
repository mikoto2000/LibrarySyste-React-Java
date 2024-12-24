import { useMemo } from "react";
import { Configuration, LendingStatusEntityControllerApiFactory } from "../../api";
import { BASE_URL } from "../../config";
import { Link, useNavigate } from "react-router";

type LendingStatusCreatePageProps = {
};

export const LendingStatusCreatePage: React.FC<LendingStatusCreatePageProps> = ({ }) => {

  const navigate = useNavigate();

  const api = useMemo(() => LendingStatusEntityControllerApiFactory(new Configuration(), BASE_URL), []);

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


    api.postCollectionResourceLendingstatusPost({
      lendingStatusRequestBody: {
        name,
      }
    }).then((result) => {
      navigate(`/lendingStatuses/${(result.data as any).id}`);
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
      <Link to="/lendingStatuses">一覧に戻る</Link>
    </>
  )
}

