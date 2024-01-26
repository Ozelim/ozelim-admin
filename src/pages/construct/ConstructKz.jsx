import React from 'react'
import { Button, NumberInput, Select, Textarea, TextInput } from '@mantine/core'
import { pb } from 'shared/api'
import { useUtils } from 'shared/hooks';
import { CiCircleRemove } from 'react-icons/ci';
import { openConfirmModal } from '@mantine/modals';

async function getQuestions () {
  return (await pb.collection('questions').getFullList({
    filter: `question = true`
  }))[0]
}

export const ConstructKz = () => {
  
  const [questions, setQuestions] = React.useState({});
 
  const [count, setCount] = React.useState(10)

  const {record, diseases} = useUtils()
  const [changedDiseases, setChangedDiseases] = React.useState(diseases)

  React.useEffect(() => {
    setChangedDiseases(diseases)
  }, [diseases])

  function handleQuestionChange (e) {
    const { value, name } = e?.currentTarget
    setQuestions({...questions, [name]: value})
  }

  async function saveQuestions () {
    await pb.collection("questions").update(questions?.id, {
      ...questions,
      count: count
    });
  }

  React.useEffect(() => {
    getQuestions().then((res) => {
      setQuestions(res);
      setCount(res?.count)
      // setCount(res.count);
    });

    pb.collection('questions').subscribe('111111111111111', function () {
      getQuestions().then((res) => {
        setQuestions(res);
        setCount(res?.count)
        // setCount(res.count);
      });
    })
  }, []);

  const [diseas, setDiseas] = React.useState('')

  async function deleteDiseas () {
    const newDiseses = diseases?.filter(q => q !== diseas)
    await pb.collection('utils').update(record?.id, {
      diseases: newDiseses
    })
    .then(() => {
      setDiseas('')
    })
  }

  const removeDiseasConfirm = () => {
    openConfirmModal({
      title: 'Подтвердите действие',
      labels: {confirm: 'Подтведить', cancel: 'Отмена'},
      centered: true,
      children: (
        <>Вы дейтсвительно хотите удалить патологию: {diseas}</>
      ),
      onConfirm: () => deleteDiseas()
    })
  }



  return (
    <div className='w-full'>
      <div className='grid grid-cols-2'>
        <div className='max-w-xs'>
          <NumberInput
            value={count}
            onChange={e => setCount(e)}
            label='Сколько вопросов отображать? (первые:)'
          />
          {Object.keys(questions).map((key, i) => {
            if (!isNaN(key)) return (
              <Textarea
                key={i}
                label={`Вопрос ${i + 1}`}
                autosize
                name={`${i + 1}`}
                value={questions?.[key]}
                onChange={handleQuestionChange}
              />
            )
          })}
        </div>
        <div className='space-y-4'>
          <Select
            label='Патологии'
            data={changedDiseases}
            value={diseas}
            onChange={e => setDiseas(e)}
            creatable
            searchable
            getCreateLabel={(query) => `+ добавить ${query}`}
            onCreate={async (query) => {
              await pb.collection('utils').update(record?.id, {
                diseases: [...diseases, query]
              })
              setChangedDiseases((current) => [...current, query]);
              return query;
            }}
            rightSection={
              diseas &&
                <CiCircleRemove 
                  size={35}
                  color='red'
                  onClick={() => removeDiseasConfirm()}
                  className='cursor-pointer hover:fill-yellow-500'
                />
            }
            // itemComponent={SelectItem}
            // filter={(value, item) =>
            //   item.label.toLowerCase().includes(value.toLowerCase().trim())
            // }
          />
        </div>
      </div>
      <Button onClick={saveQuestions}>Сохранить</Button>
    </div>
  );
};
