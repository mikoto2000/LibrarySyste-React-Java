import { useMemo } from "react";
import { Configuration, CustomerEntityControllerApiFactory } from "../../api";
import { BASE_URL } from "../../config";
import { Link, useNavigate } from "react-router";

type CustomerCreatePageProps = {
};

export const CustomerCreatePage: React.FC<CustomerCreatePageProps> = ({ }) => {

  const navigate = useNavigate();

  const api = useMemo(() => CustomerEntityControllerApiFactory(new Configuration(), BASE_URL), []);

  const handleSubmitClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    console.log(event);
    const form: any = event.currentTarget.form;
    console.log(form);
    const name = form.name.value;
    const emailAddress = form.emailAddress.value;

    console.log(JSON.stringify({
      customerRequestBody: {
        name,
        emailAddress,
      }
    }));


    api.postCollectionResourceCustomerPost({
      customerRequestBody: {
        name,
        emailAddress,
      }
    }).then((result) => {
      navigate(`/customers/${(result.data as any).id}`);
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
            <label>Email address:</label>
            <input type="text" name="emailAddress"></input>
          </div>
          <div>
            <button type="submit" onClick={handleSubmitClick}>登録</button>
          </div>
        </div>
      </form>
      <Link to="/customers">一覧に戻る</Link>
    </>
  )
}

