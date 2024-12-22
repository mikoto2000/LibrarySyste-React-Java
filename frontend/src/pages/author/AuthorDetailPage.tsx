import { useEffect, useState } from "react";
import { AuthorEntityControllerApiFactory, Configuration, EntityModelAuthor } from "../../api";
import { BASE_URL } from "../../config";
import { Link, useParams } from "react-router";

type AuthorDetailPageProps = {
};

export const AuthorDetailPage: React.FC<AuthorDetailPageProps> = ({ }) => {

  const { id } = useParams();

  const [author, setAuthor] = useState<EntityModelAuthor | undefined>(undefined);
  useEffect(() => {
    (async () => {
      if (id) {
        const api = AuthorEntityControllerApiFactory(new Configuration(), BASE_URL);

        const suthorResult = await api.getItemResourceAuthorGet({
          id
        });

        setAuthor(suthorResult.data);
      }
    })();
  }, []);

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
        <Link to="/authors">一覧に戻る</Link>
      </>
      :
      <></>
  )
}
