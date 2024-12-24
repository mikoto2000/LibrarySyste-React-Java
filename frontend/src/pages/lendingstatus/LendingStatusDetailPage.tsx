import { useEffect, useMemo, useState } from "react";
import { LendingStatusEntityControllerApiFactory, Configuration, EntityModelLendingStatus } from "../../api";
import { BASE_URL } from "../../config";
import { Link, useNavigate, useParams } from "react-router";

type LendingStatusDetailPageProps = {
};

export const LendingStatusDetailPage: React.FC<LendingStatusDetailPageProps> = ({ }) => {

  const { id } = useParams();

  const navigate = useNavigate();

  const api = useMemo(() => LendingStatusEntityControllerApiFactory(new Configuration(), BASE_URL), []);

  const [ndcCategory, setLendingStatus] = useState<EntityModelLendingStatus | undefined>(undefined);
  useEffect(() => {
    (async () => {
      if (id) {

        const ndcCategoryResult = await api.getItemResourceLendingstatusGet({
          id
        });

        setLendingStatus(ndcCategoryResult.data);
      }
    })();
  }, []);

  const handleDelete = () => {
    if (id) {
      api.deleteItemResourceLendingstatusDelete({ id }).finally(() => {
        navigate("/lendingStatuses");
      });
    }
  }

  return (
    ndcCategory
      ?
      <>
        <table>
          <tbody>
            <tr>
              <td>Id:</td>
              <td>{(ndcCategory as any).id}</td>
            </tr>
            <tr>
              <td>Name:</td>
              <td>{ndcCategory.name}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={handleDelete}>削除</button>
        <Link to="/lendingStatuses">一覧に戻る</Link>
      </>
      :
      <></>
  )
}
