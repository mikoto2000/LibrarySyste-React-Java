import { useEffect, useMemo, useState } from "react";
import { Configuration, EntityModelCustomer, CustomerEntityControllerApiFactory } from "../../api";
import { BASE_URL } from "../../config";
import { Link, useNavigate, useParams } from "react-router";

type CustomerEditPageProps = {
};

export const CustomerEditPage: React.FC<CustomerEditPageProps> = ({ }) => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [customer, setCustomer] = useState<EntityModelCustomer | undefined>(undefined);

  const api = useMemo(() => CustomerEntityControllerApiFactory(new Configuration(), BASE_URL), []);

  useEffect(() => {
    (async () => {
      if (id) {
        const customerResult = await api.getItemResourceCustomerGet({
          id
        });
        setCustomer(customerResult.data)
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
    const emailAddress = form.emailAddress.value;

    console.log(JSON.stringify({
      customerRequestBody: {
        name,
        number,
        emailAddress
      }
    }));


    api.patchItemResourceCustomerPatch({
      id,
      customerRequestBody: {
        id: Number(id),
        name,
        emailAddress
      }
    }).then((result) => {
      navigate(`/ndcCategories/${(result.data as any).id}`);
    });

  }

  return (
    <>
      {
        customer
          ?
          <form name="register">
            <div>
              <div>
                <label>id:</label>
                <input type="text" name="id" value={id} readOnly></input>
              </div>
              <div>
                <label>Name:</label>
                <input type="text" name="name" defaultValue={customer?.name}></input>
              </div>
              <div>
                <label>Email Address:</label>
                <input type="mail" name="emailAddress" defaultValue={customer?.emailAddress}></input>
              </div>
              <div>
                <button type="submit" onClick={handleSubmitClick}>変更</button>
              </div>
            </div>
          </form>
          :
          <p>表示できるアイテムがありません。</p>
      }
      <Link to={`/customers/${id}`}>詳細に戻る</Link>
      <Link to="/customers">一覧に戻る</Link>
    </>
  )
}


