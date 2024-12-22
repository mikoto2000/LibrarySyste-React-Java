import { useEffect, useState } from "react";
import { AuthorEntityControllerApiFactory, Configuration, EntityModelAuthor, EntityModelNdcCategory, NdcCategoryEntityControllerApiFactory } from "../../api";
import { BASE_URL } from "../../config";
import { Link, useNavigate } from "react-router";

type AuthorCreatePageProps = {
};

export const AuthorCreatePage: React.FC<AuthorCreatePageProps> = ({ }) => {

  const navigate = useNavigate();

  const handleSubmitClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    console.log(event);
    const form: any = event.currentTarget.form;
    console.log(form);
    const name = form.name.value;

    const api = AuthorEntityControllerApiFactory(new Configuration(), BASE_URL);

    console.log(JSON.stringify({
      authorRequestBody: {
        name,
      }
    }));


    api.postCollectionResourceAuthorPost({
      authorRequestBody: {
        name,
      }
    }).then((result) => {
      navigate(`/authors/${(result.data as any).id}`);
    });

  }

  return (
    <>
      <form name="register">
        <div>
          <div>
            <label>Name:</label>
            <input type="text" name="name"></input>
          </div>
          <div>
            <button type="submit" onClick={handleSubmitClick}>登録</button>
          </div>
        </div>
      </form>
      <Link to="/authors">一覧に戻る</Link>
    </>
  )
}

