import React from "react";
import { Button } from "@mantine/core";
import { pb } from "shared/api";
import { PartnersCard } from "shared/ui/PartnersCard";

export const Partners = () => {
  const [partners, setPartners] = React.useState({});
  const [partnersGet, setPartnersGet] = React.useState([]);
  const [changedHeadings, setChangedHeadings] = React.useState({});
  const [changedImages, setChangedImages] = React.useState({});
  const [changedText, setChangedText] = React.useState({});

  async function savePartners() {
    for (const index in changedImages) {
      if (!isNaN(index)) {
        if (changedImages?.[index] instanceof File) {
          const formData = new FormData();
          formData.append([`${index}`], changedImages?.[index]);
          await pb
            .collection("images")
            .update(partners?.images?.id, formData)
            .then((res) => {
              console.log(res);
            });
        }
      }
    }

    await pb.collection("text").update(partners?.text?.id, {
      headings: changedHeadings,
      text: changedText,
    });
  }

  async function getPartnersTest() {
    return await pb.collection("partners").getList(1, 50);
  }

  React.useEffect(() => {
    getPartnersTest().then((res) => {
      setPartnersGet(res);
      console.log(res);
    });
  }, []);

  return (
    <div className="w-full">
      <div className="container">
        <div className="grid grid-cols-3 gap-6">
          {partnersGet?.items?.map((partner) => (
            <PartnersCard
              setPartners={setPartners}
              setChangedHeadings={setChangedHeadings}
              setChangedImages={setChangedImages}
              setChangedText={setChangedText}
              changedHeadings={changedHeadings}
              partner={partner}
              changedText={changedText}
              changedImages={changedImages}
            />
          ))}
        </div>
      </div>
      <Button className="mt-10" size="lg" fullWidth onClick={savePartners}>
        Сохранить
      </Button>
    </div>
  );
};
