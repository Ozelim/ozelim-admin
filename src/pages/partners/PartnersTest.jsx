import React from "react";
import { Button } from "@mantine/core";
import { pb } from "shared/api";
import { PartnersCard } from "shared/ui/PartnersCard";

export const PartnersTest = () => {

  //   const [changedHeadings, setChangedHeadings] = React.useState({});
  //   const [changedImages, setChangedImages] = React.useState({});
  //   const [changedText, setChangedText] = React.useState({});

  //   async function savePartners() {
  //     for (const index in changedImages) {
  //       if (!isNaN(index)) {
  //         if (changedImages?.[index] instanceof File) {
  //           const formData = new FormData();
  //           formData.append([`${index}`], changedImages?.[index]);
  //           await pb
  //             .collection("images")
  //             .update(partners?.images?.id, formData)
  //             .then((res) => {
  //               console.log(res);
  //             });
  //         }
  //       }
  //     }

  //     await pb.collection("text").update(partners?.text?.id, {
  //       headings: changedHeadings,
  //       text: changedText,
  //     });
  //   }

  async function getPartnersTest() {
    return await pb.collection("partners").getList(1, 50);
  }

  React.useState(() => {
    getPartnersTest().then((res) => {
      setPartnersTest(res);
      console.log(res);
    });
  }, []);

  //   console.log(partnersTest);

  return (
    <div className="w-full">
      <div className="container">
        <div className="grid grid-cols-3 gap-6">
          {/* {Array(9)
            .fill(1)
            .map((_, i) => {
              return (
                <PartnersCard
                  setPartners={setPartners}
                  changedImages={changedImages}
                  changedHeadings={changedHeadings}
                  changedText={changedText}
                  setChangedText={setChangedText}
                  setChangedHeadings={setChangedHeadings}
                  setChangedImages={setChangedImages}
                  key={i}
                />
              );
            })} */}
          {partnersTp?.items?.map((partner) => (
            <PartnersCard />
          ))}
          123
        </div>
      </div>
      {/* <Button className="mt-10" size="lg" fullWidth onClick={savePartners}>
        Сохранить
      </Button> */}
    </div>
  );
};
