import { useEffect, useMemo, useState } from "react";
import { AuthorEntityControllerApiFactory, Configuration, EntityModelAuthor } from "../../api";
import { BASE_URL } from "../../config";
import { Link, useNavigate, useParams } from "react-router";

type AuthorDetailPageProps = {
};

export const AuthorDetailPage: React.FC<AuthorDetailPageProps> = ({ }) => {

  const { id } = useParams();

  const navigate = useNavigate();

  const api = useMemo(() => AuthorEntityControllerApiFactory(new Configuration(), BASE_URL), []);

  const [author, setAuthor] = useState<EntityModelAuthor | undefined>(undefined);
  useEffect(() => {
    (async () => {
      if (id) {

        const suthorResult = await api.getItemResourceAuthorGet({
          id
        });

        setAuthor(suthorResult.data);
      }
    })();
  }, []);

  const handleDelete = () => {
    if (id) {
      api.deleteItemResourceAuthorDelete({ id }).finally(() => {
        navigate("/authors");
      });
    }
  }

  return (
    author
      ?
      <>
        <table>
          <tbody>
            <tr>
              <td>Id:</td>
              <td>{(author as any).id}</td>
            </tr>
            <tr>
              <td>Name:</td>
              <td>{author.name}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={handleDelete}>削除</button>
        <Link to="/authors">一覧に戻る</Link>
      </>
      :
      <></>
  )
}
