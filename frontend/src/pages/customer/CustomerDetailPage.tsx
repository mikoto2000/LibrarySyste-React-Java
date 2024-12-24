import { useEffect, useMemo, useState } from "react";
import { CustomerEntityControllerApiFactory, Configuration, EntityModelCustomer } from "../../api";
import { BASE_URL } from "../../config";
import { Link, useNavigate, useParams } from "react-router";

type CustomerDetailPageProps = {
};

export const CustomerDetailPage: React.FC<CustomerDetailPageProps> = ({ }) => {

  const { id } = useParams();

  const navigate = useNavigate();

  const api = useMemo(() => CustomerEntityControllerApiFactory(new Configuration(), BASE_URL), []);

  const [customer, setCustomer] = useState<EntityModelCustomer | undefined>(undefined);
  useEffect(() => {
    (async () => {
      if (id) {

        const customerResult = await api.getItemResourceCustomerGet({
          id
        });

        setCustomer(customerResult.data);
      }
    })();
  }, []);

  const handleDelete = () => {
    if (id) {
      api.deleteItemResourceCustomerDelete({ id }).finally(() => {
        navigate("/customers");
      });
    }
  }

  return (
    customer
      ?
      <>
        <table>
          <tbody>
            <tr>
              <td>Id:</td>
              <td>{(customer as any).id}</td>
            </tr>
            <tr>
              <td>Name:</td>
              <td>{customer.name}</td>
            </tr>
            <tr>
              <td>EmailAddress:</td>
              <td>{customer.emailAddress}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={handleDelete}>削除</button>
        <Link to="/customers">一覧に戻る</Link>
      </>
      :
      <></>
  )
}
