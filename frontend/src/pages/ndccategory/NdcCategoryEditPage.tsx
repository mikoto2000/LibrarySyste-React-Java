import { useEffect, useMemo, useState } from "react";
import { Configuration, EntityModelNdcCategory, NdcCategoryEntityControllerApiFactory } from "../../api";
import { BASE_URL } from "../../config";
import { Link, useNavigate, useParams } from "react-router";

type NdcCategoryEditPageProps = {
};

export const NdcCategoryEditPage: React.FC<NdcCategoryEditPageProps> = ({ }) => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [ndcCategory, setNdcCategory] = useState<EntityModelNdcCategory | undefined>(undefined);

  const api = useMemo(() => NdcCategoryEntityControllerApiFactory(new Configuration(), BASE_URL), []);

  useEffect(() => {
    (async () => {
      if (id) {
        const ndcCategoryResult = await api.getItemResourceNdccategoryGet({
          id
        });
        setNdcCategory(ndcCategoryResult.data)
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
      ndcCategoryRequestBody: {
        name,
        number,
      }
    }));


    api.patchItemResourceNdccategoryPatch({
      id,
      ndcCategoryRequestBody: {
        id: Number(id),
        name,
        number,
      }
    }).then((result) => {
      navigate(`/ndcCategories/${(result.data as any).id}`);
    });

  }

  return (
    <>
      {
        ndcCategory
          ?
          <form name="register">
            <div>
              <div>
                <label>id:</label>
                <input type="text" name="id" value={id} readOnly></input>
              </div>
              <div>
                <label>Name:</label>
                <input type="text" name="name" defaultValue={ndcCategory?.name}></input>
              </div>
              <div>
                <label>Number:</label>
                <input type="text" name="number" defaultValue={ndcCategory?.number}></input>
              </div>
              <div>
                <button type="submit" onClick={handleSubmitClick}>変更</button>
              </div>
            </div>
          </form>
          :
          <p>表示できるアイテムがありません。</p>
      }
      <Link to={`/ndcCategories/${id}`}>詳細に戻る</Link>
      <Link to="/ndcCategories">一覧に戻る</Link>
    </>
  )
}


