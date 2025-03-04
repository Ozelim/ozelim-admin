import React from "react";
import { Accordion, Tabs, TextInput, Textarea, Button, Group } from "@mantine/core";
import { pb } from "shared/api";

const acc = [
    {
      label: "Консультации и правовая поддержка",
      description: {
        content: [
          { type: "p", text: "Юридическая консультация является основополагающей частью правовой поддержки членов Ассоциации." },
          { type: "p", text: "Особое внимание уделяется следующим аспектам:" },
          {
            type: "ul",
            items: [
              "Разъяснение норм законодательства в сфере туризма;",
              "Предоставление рекомендаций по правовому оформлению сделок;",
              "Помощь в решении правовых вопросов."
            ]
          },
          { type: "p", text: "Консультации позволяют членам Ассоциации получать актуальную информацию о своих правах и обязанностях." }
        ]
      }
    },
    {
      label: "Представление интересов в судах",
      description: {
        content: [
          { type: "p", text: "Ассоциация обеспечивает защиту своих членов в судебных спорах и разбирательствах." },
          {
            type: "ul",
            items: [
              "Оспаривание решений государственных органов;",
              "Разрешение гражданско-правовых споров;",
              "Защита прав и интересов членов Ассоциации."
            ]
          },
          { type: "p", text: "Профессиональное представление в суде обеспечивает правовую защиту и успешное разрешение конфликтов." }
        ]
      }
    },
    {
      label: "Разработка и анализ договоров",
      description: {
        content: [
          { type: "p", text: "Качественное юридическое сопровождение договоров помогает минимизировать риски." },
          {
            type: "ul",
            items: [
              "Анализ и правовая экспертиза договоров;",
              "Разработка новых договорных форм;",
              "Корректировка существующих договоров."
            ]
          },
          { type: "p", text: "Ассоциация помогает подготовить договоры, соответствующие законодательству и интересам сторон." }
        ]
      }
    },
    {
      label: "Защита прав потребителей",
      description: {
        content: [
          { type: "p", text: "Защита прав туристов и клиентов туристических компаний является одной из ключевых задач Ассоциации." },
          {
            type: "ul",
            items: [
              "Консультации по защите прав потребителей;",
              "Помощь в составлении претензий;",
              "Содействие в разрешении споров с туристическими операторами."
            ]
          },
          { type: "p", text: "Юридическая поддержка помогает туристам и компаниям урегулировать споры мирным путем." }
        ]
      }
    },
    {
      label: "Взаимодействие с государственными органами",
      description: {
        content: [
          { type: "p", text: "Ассоциация активно сотрудничает с государственными органами для защиты интересов своих членов." },
          {
            type: "ul",
            items: [
              "Участие в разработке нормативных актов;",
              "Подготовка официальных обращений;",
              "Контроль за соблюдением законодательства в сфере туризма."
            ]
          },
          { type: "p", text: "Данный подход помогает туристическому бизнесу адаптироваться к изменениям в законодательстве." }
        ]
      }
    },
    {
      label: "Сопровождение сделок",
      description: {
        content: [
          { type: "p", text: "Члены Ассоциации могут рассчитывать на полное юридическое сопровождение сделок, касающихся туристической деятельности." },
          {
            type: "ul",
            items: [
              "Проверка и анализ договоров на соответствие законодательству;",
              "Подготовка и составление договоров;",
              "Участие в переговорах с контрагентами."
            ]
          },
          { type: "p", text: "Это позволяет минимизировать риски и избежать спорных ситуаций." }
        ]
      }
    },
    {
      label: "Лицензирование деятельности",
      description: {
        content: [
          { type: "p", text: "Получение лицензии является важным элементом для ведения туристического бизнеса." },
          {
            type: "ul",
            items: [
              "Консультации по необходимым документам и требованиям для получения лицензии;",
              "Подготовка и подача пакета документов;",
              "Сопровождение процесса получения разрешительных документов."
            ]
          },
          { type: "p", text: "Правильное оформление лицензий и разрешений позволяет избежать штрафов и других проблем с государственными органами." }
        ]
      }
    },
    {
      label: "Юридическая экспертиза договоров",
      description: {
        content: [
          { type: "p", text: "Ассоциация предлагает услуги по юридической экспертизе договоров для своих членов." },
          {
            type: "ul",
            items: [
              "Анализ и корректировка договоров;",
              "Разработка шаблонных договоров;",
              "Подготовка специализированных договоров."
            ]
          },
          { type: "p", text: "Это помогает защитить интересы членов Ассоциации и избежать конфликтных ситуаций." }
        ]
      }
    },
    {
      label: "Международное правовое сопровождение",
      description: {
        content: [
          { type: "p", text: "Члены Ассоциации могут получить юридическую помощь по вопросам международного сотрудничества." },
          {
            type: "ul",
            items: [
              "Подготовка и сопровождение международных контрактов;",
              "Консультации по правовому регулированию трансграничной деятельности;",
              "Сопровождение международных сделок."
            ]
          },
          { type: "p", text: "Это позволяет членам Ассоциации расширять свой бизнес за рубежом с минимальными рисками." }
        ]
      }
    },
    {
      label: "Консультации по трудовым вопросам",
      description: {
        content: [
          { type: "p", text: "Юридическая помощь в сфере трудовых отношений также важна для членов Ассоциации." },
          {
            type: "ul",
            items: [
              "Подготовка трудовых договоров и соглашений;",
              "Консультирование по вопросам увольнений и дисциплинарных взысканий;",
              "Представление интересов в трудовых спорах."
            ]
          },
          { type: "p", text: "Это помогает членам Ассоциации избежать конфликтов с сотрудниками и соблюдать трудовое законодательство." }
        ]
      }
    },
    {
      label: "Юридическая поддержка проектов развития",
      description: {
        content: [
          { type: "p", text: "Ассоциация активно поддерживает проекты развития туристической инфраструктуры." },
          {
            type: "ul",
            items: [
              "Юридическое сопровождение инвестиционных проектов;",
              "Консультации по правовым вопросам участия в государственных программах;",
              "Помощь в разработке правовых стратегий."
            ]
          },
          { type: "p", text: "Это помогает членам Ассоциации эффективно развивать свои бизнесы и получить поддержку на всех этапах реализации проектов." }
        ]
      }
    },
    {
      label: "Регистрация и сопровождение эндаумент-фонд",
      description: {
        content: [
          { type: "p", text: "Ассоциация предлагает помощь в создании и управлении эндаумент-фондами для долгосрочных проектов." },
          {
            type: "ul",
            items: [
              "Регистрация фондов для финансирования инициатив;",
              "Сопровождение деятельности фондов;",
              "Привлечение доноров и управление активами."
            ]
          },
          { type: "p", text: "Эндаумент-фонды помогают обеспечить устойчивое развитие туристической отрасли." }
        ]
      }
    },
    {
      label: "Защита прав потребителей",
      description: {
        content: [
          { type: "p", text: "Ассоциация также предлагает услуги по защите прав потребителей в туристической сфере." },
          {
            type: "ul",
            items: [
              "Консультирование по правам туристов;",
              "Представление интересов членов Ассоциации в случаях жалоб;",
              "Сопровождение дел в суде."
            ]
          },
          { type: "p", text: "Это помогает членам Ассоциации соблюдать законодательство и поддерживать высокий уровень доверия со стороны клиентов." }
        ]
      }
    }
];

export const RightsAccordion = () => {

  const [accData, setAccData] = React.useState([]);

  // Fetch data from PocketBase on component mount
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const records = await pb.collection('rights_accordion').getFullList();
        const formattedData = records.map((record) => {
          const description = record.description;
          const descriptionKz = record.description_kz;

          // Check if the description is a string, then parse it
          let formattedDescription = {};
          let formattedDescriptionKz = {};

          try {
            if (typeof description === 'string') {
              formattedDescription = JSON.parse(description); // Parse string to JSON
              formattedDescriptionKz = JSON.parse(descriptionKz); // Parse string to JSON
            } else {
              formattedDescription = description; // It's already an object
              formattedDescriptionKz = descriptionKz; // It's already an object
            }
          } catch (error) {
            console.error('Error parsing description:', error);
          }

          return {
            ...record,
            label: record?.label,
            label_kz: record?.label_kz,
            description: formattedDescription,
            description_kz: formattedDescriptionKz,
          };
        });

        setAccData(formattedData); // Set the fetched data into state
      } catch (error) {
        console.error('Error fetching data from PocketBase:', error);
      }
    };

    fetchData();
  }, []);

  const handleDescriptionChange = (index, sectionIndex, field, value, kz) => {
    if (kz) {
      const updatedData = [...accData];
      updatedData[index].description_kz.content[sectionIndex][field] = value;
      setAccData(updatedData);
      return
    }

    const updatedData = [...accData];
    updatedData[index].description.content[sectionIndex][field] = value;
    setAccData(updatedData);
  };

  // Save the updated data back to PocketBase
  const saveData = async (id, data) => {
    console.log(data, 'data');
    
    try {
      await pb.collection('rights_accordion').update(id, {
        label: data.label,
        label_kz: data?.label_kz, // Make sure description is saved as a JSON string
        description: JSON.stringify(data.description), // Make sure description is saved as a JSON string
        description_kz: JSON.stringify(data.description_kz), // Make sure description is saved as a JSON string
      });
      alert('Данные сохранены');
  } catch (error) {
      console.error('Error saving data to PocketBase:', error);
    }
  };

  // Function to render description content with editable p and ul/li elements
  const renderDescription = (description, index, kz) => {
    return description?.content.map((item, sectionIndex) => {
      if (item.type === 'p') {
        return (
          <div key={sectionIndex + 100}>
            <Textarea
              value={item.text}
              onChange={(e) => handleDescriptionChange(index, sectionIndex, 'text', e.target.value, kz)}
              placeholder="Edit paragraph"
              className="my-2"
            />
          </div>
        );
      }
      if (item.type === 'ul') {
        return (
          <div key={sectionIndex + 200}>
            <ul>
              {item.items.map((li, liIndex) => (
                <li key={liIndex + 300}>
                  <TextInput
                    value={li}
                    onChange={(e) => handleDescriptionChange(index, sectionIndex, `items[${liIndex}]`, e.target.value, kz)}
                    placeholder="Edit list item"
                    className="my-2"
                  />
                </li>
              ))}
            </ul>
          </div>
        );
      }
      return null;
    });
  };

  return (
    <>
      <Tabs
        defaultValue="ru"
      >
        <Tabs.List grow>
          <Tabs.Tab value="ru">Русский</Tabs.Tab>
          <Tabs.Tab value="kz">Казахский</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="ru">
          <Accordion defaultValue="0" variant="separated" className="my-10">
            {accData.map((item, index) => (
              <Accordion.Item key={index + 400} value={`${index}`}>
                <Accordion.Control className="!text-xl !font-bold">
                  <TextInput
                    value={item?.label}
                    onChange={(e) => {
                      const updatedData = [...accData];
                      updatedData[index].label = e.target.value;
                      setAccData(updatedData);
                    }}
                    className="!text-xl !font-bold"
                  />
                </Accordion.Control>
                <Accordion.Panel className="accordion-body px-4 pb-4">
                  {renderDescription(item.description, index)}
                  <Group position="right" className="mt-4">
                    <Button onClick={() => saveData(item.id, item)} color="blue">
                      Сохранить
                    </Button>
                  </Group>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Tabs.Panel>
        <Tabs.Panel value="kz">
          <Accordion defaultValue="0" variant="separated" className="my-10">
            {accData.map((item, index) => (
              <Accordion.Item key={index + 400} value={`${index}`}>
                <Accordion.Control className="!text-xl !font-bold">
                  <TextInput
                    value={item?.label_kz}
                    onChange={(e) => {
                      const updatedData = [...accData];
                      updatedData[index].label_kz = e.target.value;
                      setAccData(updatedData);
                    }}
                    className="!text-xl !font-bold"
                  />
                </Accordion.Control>
                <Accordion.Panel className="accordion-body px-4 pb-4">
                  {renderDescription(item.description_kz, index, 'kz')}
                  <Group position="right" className="mt-4">
                    <Button onClick={() => saveData(item.id, item)} color="blue">
                      Сохранить
                    </Button>
                  </Group>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Tabs.Panel>
      </Tabs>
      {/* <Button
        onClick={async () => {
          try {
            // Iterate over each item in the data to save it in PocketBase
            for (let item of acc) {
              // Create a new record in the 'rights_accordion' collection
              const record = await pb.collection('rights_accordion').create({
                label: item.label, // save the label
                description: JSON.stringify(item.description), // save description as stringified JSON
              });
        
              console.log('Data saved successfully:', record);
            }
          } catch (error) {
            console.error('Error saving data to PocketBase:', error);
          }
        }}
      >
        Добавить
      </Button> */}
    </>
  );
};