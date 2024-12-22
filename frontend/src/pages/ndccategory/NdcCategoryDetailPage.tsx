import { useEffect, useState } from "react";
import { NdcCategoryEntityControllerApiFactory, Configuration, EntityModelNdcCategory } from "../../api";
import { BASE_URL } from "../../config";
import { Link, useParams } from "react-router";

type NdcCategoryDetailPageProps = {
};

export const NdcCategoryDetailPage: React.FC<NdcCategoryDetailPageProps> = ({ }) => {

  const { id } = useParams();

  const [ndcCategory, setNdcCategory] = useState<EntityModelNdcCategory | undefined>(undefined);
  useEffect(() => {
    (async () => {
      if (id) {
        const api = NdcCategoryEntityControllerApiFactory(new Configuration(), BASE_URL);

        const ndcCategoryResult = await api.getItemResourceNdccategoryGet({
          id
        });

        setNdcCategory(ndcCategoryResult.data);
      }
    })();
  }, []);

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
        <Link to="/ndcCategories">一覧に戻る</Link>
      </>
      :
      <></>
  )
}
