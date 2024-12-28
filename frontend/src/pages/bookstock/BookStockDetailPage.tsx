import { useEffect, useMemo, useState } from "react";
import { BookStockEntityControllerApiFactory, Configuration, EntityModelBookStock } from "../../api";
import { BASE_URL } from "../../config";
import { Link, useNavigate, useParams } from "react-router";

type BookStockDetailPageProps = {
};

export const BookStockDetailPage: React.FC<BookStockDetailPageProps> = ({ }) => {

  const { id } = useParams();

  const navigate = useNavigate();

  const api = useMemo(() => BookStockEntityControllerApiFactory(new Configuration(), BASE_URL), []);

  const [bookStock, setBookStock] = useState<EntityModelBookStock | undefined>(undefined);
  useEffect(() => {
    (async () => {
      if (id) {

        console.log(api);

        const bookStockResult = await api.getItemResourceBookstockGet({
          id
        });

        setBookStock(bookStockResult.data);
      }
    })();
  }, []);

  const handleDelete = () => {
    if (id) {
      api.deleteItemResourceBookstockDelete({ id }).finally(() => {
        navigate("/bookStocks");
      });
    }
  }

  return (
    bookStock
      ?
      <>
        <table>
          <tbody>
            <tr>
              <td>Id:</td>
              <td>{(bookStock as any).id}</td>
            </tr>
            <tr>
              <td>Name:</td>
              <td>{(bookStock as any)._embedded.bookMaster.name}</td>
            </tr>
            <tr>
              <td>Book Stock Status:</td>
              <td>{(bookStock as any)._embedded.bookStockStatus.name}</td>
            </tr>
            <tr>
              <td>Memo:</td>
              <td>{bookStock.memo}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={handleDelete}>削除</button>
        <Link to={`/bookStocks/${id}/edit`}>編集する</Link>
        <Link to="/bookStocks">一覧に戻る</Link>
      </>
      :
      <></>
  )
}
