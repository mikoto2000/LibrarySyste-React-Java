import { useEffect, useMemo, useState } from "react";
import { Configuration, EntityModelAuthor, AuthorEntityControllerApiFactory } from "../../api";
import { BASE_URL } from "../../config";
import { Link, useNavigate, useParams } from "react-router";

type AuthorEditPageProps = {
};

export const AuthorEditPage: React.FC<AuthorEditPageProps> = ({ }) => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [author, setAuthor] = useState<EntityModelAuthor | undefined>(undefined);

  const api = useMemo(() => AuthorEntityControllerApiFactory(new Configuration(), BASE_URL), []);

  useEffect(() => {
    (async () => {
      if (id) {
        const authorResult = await api.getItemResourceAuthorGet({
          id
        });
        setAuthor(authorResult.data)
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

    console.log(JSON.stringify({
      authorRequestBody: {
        name,
        number,
      }
    }));


    api.patchItemResourceAuthorPatch({
      id,
      authorRequestBody: {
        id: Number(id),
        name,
      }
    }).then((result) => {
      navigate(`/ndcCategories/${(result.data as any).id}`);
    });

  }

  return (
    <>
      {
        author
          ?
          <form name="register">
            <div>
              <div>
                <label>id:</label>
                <input type="text" name="id" value={id} readOnly></input>
              </div>
              <div>
                <label>Name:</label>
                <input type="text" name="name" defaultValue={author?.name}></input>
              </div>
              <div>
                <button type="submit" onClick={handleSubmitClick}>変更</button>
              </div>
            </div>
          </form>
          :
          <p>表示できるアイテムがありません。</p>
      }
      <Link to={`/authors/${id}`}>詳細に戻る</Link>
      <Link to="/authors">一覧に戻る</Link>
    </>
  )
}




