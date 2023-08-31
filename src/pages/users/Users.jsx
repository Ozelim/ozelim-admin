import { Button, Pagination, Switch, Table, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { openConfirmModal } from "@mantine/modals";
import dayjs from "dayjs";
import React from "react";
import { pb } from "shared/api";

import { AiFillCheckCircle, AiFillLock } from "react-icons/ai";

async function getUsers(page = 1) {
  return await pb.collection("users").getList(page, 50);
}

export const Users = () => {
  const [users, setUsers] = React.useState([]);
  const [page, setPage] = React.useState({});

  const [search, setSearch] = React.useState("");
  const [searchValue] = useDebouncedValue(search, 1000);

  async function getPyramidByUser(userId) {
    const pyramid = (
      await pb
        .collection("pyramid")
        .getFullList({ expand: "1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12" })
    )[0];
    const pyramidsUser = await pb.collection("users").getOne(userId);
    let foundUser = null;
    let result = [];

    for (const stage in pyramid) {
      if (!isNaN(stage)) {
        const stageArrays = pyramid?.expand?.[stage];
        const stageUser = stageArrays?.find((e) => e?.id === userId);
        if (stageUser) {
          foundUser = userId;
          const properties = Object.keys(pyramid?.expand);
          // const pows = properties.length - Number(stage)

          properties.map((key, i) => {
            if (Number(key) > Number(stage)) {
              // console.log(pyramid?.expand?.[key], key, stage, 'stage')
              result.push(pyramid?.expand?.[key]);

              return;
            }
          });

          result = result?.map((arr, i) => {
            return arr.slice(0, Math.pow(2, i + 1));
          });
          result.unshift([pyramidsUser]);
        }
      }
    }

    if (foundUser) {
      return {
        pyramid: pyramid,
        result,
      };
    } else {
      return {
        pyramid: pyramid,
        result: null,
      };
    }
  }

  async function searchByValue() {
    if (!searchValue) {
      handleUsers(1);
      return;
    }
    const foundUsers = await pb.collection("users").getFullList({
      filter: `
        id = '${searchValue}' ||
        name ?~ '${searchValue}' ||
        email ?~ '${searchValue}' ||
        phone ?~ '${searchValue}' ||
        city ?~ '${searchValue}' ||
        iin ?~ '${searchValue}' 
      `,
    });

    if (foundUsers.length !== 0) {
      setUsers(foundUsers);
      setPage(null);
    }
  }

  React.useEffect(() => {
    searchByValue();
  }, [searchValue]);

  React.useEffect(() => {
    getUsers().then((res) => {
      setUsers(res.items);
      setPage({ ...res, items: null });
    });

    pb.collection("users").subscribe("*", function () {
      getUsers(page?.page).then((res) => {
        setUsers(res.items);
        setPage({ ...res, items: null });
      });
    });
  }, []);

  function handleUsers(val) {
    getUsers(val).then((res) => {
      setUsers(res.items);
      setPage({ ...res, items: null });
    });
  }

  async function checkReferals(binary, sponsor) {
    if (binary?.referals?.length < 2) {
      await pb
        .collection("binary")
        .update(binary?.id, {
          referals: [...binary?.referals, sponsor?.id],
        })
        .then(async () => {
          await pb.collection("binary").create({
            sponsor: sponsor?.id,
          });
          return;
        });
    }
  }

  async function findAvailableSlot(guest, depth = 0, sponsor) {
    console.log(guest, depth, sponsor);

    if (depth === 8) {
      return; // Достигнута максимальная глубина, прекращаем поиск
    }

    if (guest.referals && guest.referals.length < 2) {
      console.log(sponsor, "sponsor");
      console.log("this code");
      await pb
        .collection("binary")
        .update(guest?.id, {
          referals: [...guest?.referals, sponsor?.id],
        })
        .then(async () => {
          await pb.collection("binary").create({
            id: sponsor?.id,
            sponsor: sponsor?.id,
          });
          console.log("succ");
        });
      // guest.referals.push(guest);
      return; // Найдено свободное место, завершаем поиск
    }

    if (guest.referals) {
      for (const referal of guest.referals) {
        const referalSlot = await pb
          .collection("binary")
          .getFirstListItem(`sponsor = '${referal}'`);

        if (referalSlot.referals && referalSlot.referals.length < 2) {
          await pb
            .collection("binary")
            .update(referalSlot?.id, {
              referals: [...referalSlot?.referals, sponsor?.id],
            })
            .then(async () => {
              await pb.collection("binary").create({
                id: sponsor?.id,
                sponsor: sponsor?.id,
              });
            })
            .then(() => {
              console.log("succ");
            });
          // referal.referals.push(guest);
          return; // Найдено свободное место, завершаем поиск
        }
      }

      for (const referal of guest?.referals) {
        const referalSlot = await pb
          .collection("binary")
          .getFirstListItem(`sponsor = '${referal}'`);

        // if (referalSlot?.referals.referals && referalSlot?.referals.referals.length === 2) {
        //   continue; // У этого referal уже нет свободных мест, переходим к следующему
        // }

        findAvailableSlot(guest, depth + 1, sponsor);
        if (referalSlot.referals && referalSlot.referals.length >= 2) {
          return; // Найдено свободное место, завершаем поиск
        }
      }
    }
  }

  async function verifyUser(userId) {
    return await pb
      .collection("users")
      .update(userId, {
        // verified: true
      })
      .then(async (res) => {



        const sponsor = await pb.collection("users").getOne(res?.sponsor);

        const referals = await pb.collection("users").getFullList({
          filter: `sponsor = '${sponsor.id}'`,
        });

        if (referals.length === 1 && !sponsor?.bin) {
          const sponsorParent = await pb
            .collection("users")
            .getOne(sponsor?.sponsor);

          const binarySponsorParent = await pb
            .collection("binary")
            .getFirstListItem(`sponsor = '${sponsorParent.id}'`);

        async function getUser (userId) {
          const referals = await pb.collection('binary').getFullList({filter: `sponsor = '${userId}'`})?.[0]

          console.log();

          return referals?.length
        } 

        console.log(getUser(binarySponsorParent?.id), 'pizdec');


          // findAvailableSlot(binarySponsorParent, 4, sponsor);

          // await checkReferals(binarySponsorParent, sponsor)

          let newRefs = []

          if (binarySponsorParent?.referals?.length < 2) {
            await pb.collection('binary').update(binarySponsorParent?.id, {
              referals: [...binarySponsorParent?.referals, sponsor?.id]
            })
            .then(async () => {
              await pb.collection('binary').create({
                sponsor: sponsor?.id,
              })
            })
          }

          else {

            const ref1 = (await pb.collection('binary').getFullList({filter: `sponsor = '${binarySponsorParent?.referals?.[0]}'`}))[0]?.referals
            const ref2 = (await pb.collection('binary').getFullList({filter: `sponsor = '${binarySponsorParent?.referals?.[1]}'`}))[0]?.referals

            let refs = []

            for (let i = 1; i <= 5; i++) {

              let multiple = Math.pow(2, i);

              if (multiple === 2) {

                const ref1 = (await pb.collection('binary').getFullList({filter: `sponsor = '${binarySponsorParent?.referals?.[0]}'`}))[0]
                const ref2 = (await pb.collection('binary').getFullList({filter: `sponsor = '${binarySponsorParent?.referals?.[1]}'`}))[0]

                newRefs = [...newRefs, ref1?.referals, ref2?.referals]

                if (ref1) {
                  if (ref1?.referals?.length < 2) {
                    await pb
                    .collection("binary")
                    .update(ref1?.id, {
                      referals: [...ref1?.referals, sponsor?.id],
                    })
                    .then(async () => {
                      await pb.collection("binary").create({
                        sponsor: sponsor?.id,
                      });
                      return
                    });
                  }
                }

                if (ref2) {
                  if (ref2?.referals?.length < 2) {
                    await pb
                    .collection("binary")
                    .update(ref2?.id, {
                      referals: [...ref2?.referals, sponsor?.id],
                    })
                    .then(async () => {
                      await pb.collection("binary").create({
                        sponsor: sponsor?.id,
                      });
                      return
                    });
                  }
                }

              //   Array(multiple).fill(1).forEach(async (_, i) => { 
              //     if (ref) {
              //       refs.push(ref)
              //     }
              //     refs?.forEach(async (val, i) => {
              //       if (val?.referals?.length < 2) {
              //         await pb
              //           .collection("binary")
              //           .update(val?.id, {
              //             referals: [...val?.referals, sponsor?.id],
              //           })
              //           .then(async () => {
              //             await pb.collection("binary").create({
              //               sponsor: sponsor?.id,
              //             });
              //           });
              //       } else {
              //         newRefs?.push(val)
              //       }
              // });
              //     // if (referals?.[i]) {
              //     //   if (referals?.[i]?.referals?.length < 2) {
              //     //     loop = true
              //     //     each = true
              //     //     return await pb.collection('binary').update(referals?.[i]?.id, {
              //     //       referals: [...referals?.[i]?.referals, sponsor?.id]
              //     //     })
              //     //     .then(async () => {
              //     //       await pb.collection('binary').create({
              //     //         sponsor: sponsor?.id,
              //     //       })
              //     //     })
              //     //   }
              //     //   else {
  
              //     //     const sponsorreferals = await pb.collection('binary').getFullList({filter: `sponsor = '${referals?.[i]?.referals?.[i]}'`})
  
              //     //     if (sponsorreferals?.[i]) {
              //     //       if (sponsorreferals?.[i]?.referals?.length < 2) {
              //     //         loop = true
              //     //         each = true
  
              //     //         return await pb.collection('binary').update(sponsorreferals?.[i]?.id, {
              //     //           referals: [...sponsorreferals?.[i]?.referals, sponsor?.id]
              //     //         })
              //     //         .then(async () => {
              //     //           const createdSlot = (await pb.collection('binary').getFullList({filter: `sponsor = '${sponsor?.id}'`}))[0]
              //     //           if (createdSlot) return
  
              //     //           await pb.collection('binary').create({
              //     //             sponsor: sponsor?.id,
              //     //           })
              //     //         })
              //     //       }
              //     //     }
              //     //   }
              //     // }
              //   })
              }

              if (multiple === 4) {

                

                let checkRefs = []
                
                async function getRefs () {
                  let zxc = []
                  newRefs?.flat(1)?.forEach(async (val, i) => {
                    const ref = (await pb.collection('binary').getFullList({filter: `sponsor = '${val}'`}))[0]
                    console.log(ref, 'asdasdasd');
                    if (ref) {
                      zxc.push(val)
                    }
                  })
                  return zxc
                } 

                checkRefs = getRefs()
                console.log(checkRefs, 'asdasd');
              }


              if (multiple === 8) {
                console.log(newRefs, '8');
              }

     

            }
          }
        }
    });
  }
  // Пример использования

  const confirmVerifing = (userId) =>
    openConfirmModal({
      title: "Подтвердить верификацию",
      centered: true,
      children: <>Подтверить верификацию пользователя</>,
      labels: { confirm: "Подтвердить", cancel: "Отмена" },
      onConfirm: () => verifyUser(userId),
    });

  return (
    <>
      <div className="w-full">
        <TextInput
          label="Поиск"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
        <Table className="mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th></th>
              <th>Имя</th>
              <th>Бинар</th>
              <th>Маркетинг</th>
              <th>Баланс</th>
              <th>Почта</th>
              <th>Телефон</th>
              <th>Город</th>
              <th>Дата рождения</th>
              <th>Область</th>
              <th>Адрес</th>
              <th>Спонсор</th>
              <th>Дата регистрации</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => {
              return (
                <tr
                  key={i}
                  // onClick={() => openChangeModal(user)}
                >
                  <td>{user.id}</td>
                  <td>
                    {user?.verified ? (
                      <Button compact variant={"subtle"} color={"green"}>
                        <AiFillCheckCircle size={20} />
                      </Button>
                    ) : (
                      <Button
                        compact
                        variant={"subtle"}
                        color="yellow"
                        onClick={() => confirmVerifing(user?.id)}
                      >
                        <AiFillLock size={20} />
                      </Button>
                    )}
                  </td>
                  <td>{user.name}</td>
                  <td>{user.bin ? "Да" : "Нет"}</td>
                  <td>{user.level}</td>
                  <td>{user.balance}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.city}</td>
                  <td>{dayjs(user.birthday).format(`DD.MM.YY`)}</td>
                  <td>{user.region}</td>
                  <td>{user.adress}</td>
                  <td>{user.sponsor}</td>
                  <td>{dayjs(user.created).format(`DD.MM.YY, HH:mm`)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {page && (
          <Pagination
            value={page?.page}
            total={page?.totalPages}
            onChange={handleUsers}
          />
        )}
      </div>
    </>
  );
};
