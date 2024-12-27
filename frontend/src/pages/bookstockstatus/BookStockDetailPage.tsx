import { useEffect, useMemo, useState } from "react";
import { BookStockStatusEntityControllerApiFactory, Configuration, EntityModelBookStockStatus } from "../../api";
import { BASE_URL } from "../../config";
import { Link, useNavigate, useParams } from "react-router";

type BookStockStatusDetailPageProps = {
};

export const BookStockStatusDetailPage: React.FC<BookStockStatusDetailPageProps> = ({ }) => {

  const { id } = useParams();

  const navigate = useNavigate();

  const api = useMemo(() => BookStockStatusEntityControllerApiFactory(new Configuration(), BASE_URL), []);

  const [ndcCategory, setBookStockStatus] = useState<EntityModelBookStockStatus | undefined>(undefined);
  useEffect(() => {
    (async () => {
      if (id) {

        const ndcCategoryResult = await api.getItemResourceBookstockstatusGet({
          id
        });

        setBookStockStatus(ndcCategoryResult.data);
      }
    })();
  }, []);

  const handleDelete = () => {
    if (id) {
      api.deleteItemResourceBookstockstatusDelete({ id }).finally(() => {
        navigate("/bookStockStatuses");
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
        <Link to={`/bookStockStatuses/${id}/edit`}>編集する</Link>
        <Link to="/bookStockStatuses">一覧に戻る</Link>
      </>
      :
      <></>
  )
}
