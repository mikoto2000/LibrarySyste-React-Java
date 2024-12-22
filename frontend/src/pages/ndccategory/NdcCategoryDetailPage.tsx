import { useEffect, useMemo, useState } from "react";
import { NdcCategoryEntityControllerApiFactory, Configuration, EntityModelNdcCategory } from "../../api";
import { BASE_URL } from "../../config";
import { Link, useNavigate, useParams } from "react-router";

type NdcCategoryDetailPageProps = {
};

export const NdcCategoryDetailPage: React.FC<NdcCategoryDetailPageProps> = ({ }) => {

  const { id } = useParams();

  const navigate = useNavigate();

  const api = useMemo(() => NdcCategoryEntityControllerApiFactory(new Configuration(), BASE_URL), []);

  const [ndcCategory, setNdcCategory] = useState<EntityModelNdcCategory | undefined>(undefined);
  useEffect(() => {
    (async () => {
      if (id) {

        const ndcCategoryResult = await api.getItemResourceNdccategoryGet({
          id
        });

        setNdcCategory(ndcCategoryResult.data);
      }
    })();
  }, []);

  const handleDelete = () => {
    if (id) {
      api.deleteItemResourceNdccategoryDelete({ id }).finally(() => {
        navigate("/ndcCategories");
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
            <tr>
              <td>Number:</td>
              <td>{ndcCategory.number}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={handleDelete}>削除</button>
        <Link to="/ndcCategories">一覧に戻る</Link>
      </>
      :
      <></>
  )
}
