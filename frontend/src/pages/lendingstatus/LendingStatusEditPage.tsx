import { useEffect, useMemo, useState } from "react";
import { Configuration, EntityModelLendingStatus, LendingStatusEntityControllerApiFactory } from "../../api";
import { BASE_URL } from "../../config";
import { Link, useNavigate, useParams } from "react-router";

type LendingStatusEditPageProps = {
};

export const LendingStatusEditPage: React.FC<LendingStatusEditPageProps> = ({ }) => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [lendingStatus, setLendingStatus] = useState<EntityModelLendingStatus | undefined>(undefined);

  const api = useMemo(() => LendingStatusEntityControllerApiFactory(new Configuration(), BASE_URL), []);

  useEffect(() => {
    (async () => {
      if (id) {
        const lendingStatusResult = await api.getItemResourceLendingstatusGet({
          id
        });
        setLendingStatus(lendingStatusResult.data)
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
      lendingStatusRequestBody: {
        name,
        number,
      }
    }));


    api.patchItemResourceLendingstatusPatch({
      id,
      lendingStatusRequestBody: {
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
        lendingStatus
          ?
          <form name="register">
            <div>
              <div>
                <label>id:</label>
                <input type="text" name="id" value={id} readOnly></input>
              </div>
              <div>
                <label>Name:</label>
                <input type="text" name="name" defaultValue={lendingStatus?.name}></input>
              </div>
              <div>
                <button type="submit" onClick={handleSubmitClick}>変更</button>
              </div>
            </div>
          </form>
          :
          <p>表示できるアイテムがありません。</p>
      }
      <Link to={`/lendingStatuses/${id}`}>詳細に戻る</Link>
      <Link to="/lendingStatuses">一覧に戻る</Link>
    </>
  )
}

