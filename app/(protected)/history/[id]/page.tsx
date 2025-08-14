"use client"

import {StateBadge} from "@/components/template/homeHistoric";
import {Historic} from "@/types/Historic";
import {useEffect, useState, useTransition} from "react";
import {useProtectedApiCall} from "@/hooks/useProtectedApiCall";
import {Loading} from "@/components/template/loading";
import {useParams, useRouter} from "next/navigation";
import {toast} from "sonner";
import {Button} from "@/components/ui/button";
import {Header} from "@/components/template/header";
import {HistoryTableItem} from "@/components/history/historyTableItem";

export default function HistoryScreen() {
    const {id} = useParams()

    const getHistory = useProtectedApiCall<Historic[]>({
        endpoint: `/historic/full/${id}`
    })


    const [isLoading, startTransition] = useTransition()
    const router = useRouter()
    const [historic, setHistoric] = useState<Historic[] | null>(null)

    useEffect(() => {
        startTransition(async () => {
            const res = await getHistory()
            if (res.isError) {
                toast.error("Something went wrong!")
                return
            }

            setHistoric(res.response)
        })
    }, [])

    if (historic?.length == 0) {
        return (
            <div className={"flex justify-center items-center w-full h-full text-text/80 text-2xl"}>
                <h2>Nothing yet</h2>
                <Button onClick={() => router.push("/home")} variant={"gold"}>
                    Let's get started?
                </Button>
            </div>
        )
    }


    return (
        <div>
            <Header label={"History"} showBackButton showConfig/>
            <div className="space-y-4 w-full px-2 py-5 max-w-[1000px] mx-auto">
                {isLoading && <Loading/>}
                <div className={"px-4 rounded-lg overflow-hidden"}>
                    <table className={"rounded-table "} id={"history_table"}>
                        <thead>
                        <tr>
                            <th>START</th>
                            <th>FINISH</th>
                            <th>PRIZE</th>
                            <th className={"hidden md:table-cell"}>POINTS</th>
                            <th className={"hidden md:table-cell"}>HELPS</th>
                            <th>STATE</th>
                        </tr>
                        </thead>
                        <tbody>
                        {historic?.map((h) => (
                            <HistoryTableItem history={h} key={h.id}/>
                        ))}
                        </tbody>
                    </table>
                </div>

                     {/*{historic?.map((item) => (*/}
                     {/*    <div*/}
                     {/*        key={item.id}*/}
                     {/*        className="flex justify-between items-center p-4 rounded-xl bg-back-secondary border border-highlight/40 shadow-sm"*/}
                     {/*    >*/}
                     {/*        <div className="text-sm text-text flex items-center lg:hidden">*/}
                     {/*            {new Date(item.match.startDate).toLocaleDateString("en-GB", {*/}
                     {/*                day: "2-digit",*/}
                     {/*                month: "2-digit",*/}
                     {/*                year: "numeric",*/}
                     {/*            })}*/}
                     {/*            <div className={"inline-block h-[.5px] w-2 bg-text mx-1.5   "}></div>*/}
                     {/*            {new Date(item.finishDate).toLocaleDateString("en-GB", {*/}
                     {/*                day: "2-digit",*/}
                     {/*                month: "2-digit",*/}
                     {/*                year: "numeric",*/}
                     {/*            })}*/}
                     {/*        </div>*/}
                     {/*        <div className="hidden text-sm text-text flex items-center lg:flex ">*/}
                     {/*            {new Date(item.match.startDate).toLocaleDateString("en-GB", {*/}
                     {/*                day: "2-digit",*/}
                     {/*                month: "2-digit",*/}
                     {/*                year: "numeric",*/}
                     {/*                hour: "2-digit",*/}
                     {/*                minute: "2-digit",*/}
                     {/*            })}*/}
                     {/*            <div className={"inline-block h-[.5px] w-2 bg-text mx-1.5   "}></div>*/}
                     {/*            {new Date(item.finishDate).toLocaleDateString("en-GB", {*/}
                     {/*                day: "2-digit",*/}
                     {/*                month: "2-digit",*/}
                     {/*                year: "numeric",*/}
                     {/*                hour: "2-digit",*/}
                     {/*                minute: "2-digit",*/}
                     {/*            })}*/}
                     {/*        </div>*/}

                     {/*        <div className="text-xl font-bold text-gold text-center ">*/}
                     {/*            {formatPrize(item.finalPrize)}*/}
                     {/*        </div>*/}

                     {/*        <div className={"min-w-[90px] flex justify-center"}>*/}
                     {/*            <StateBadge state={item.finalState}/>*/}
                     {/*        </div>*/}
                     {/*    </div>*/}
                     {/*))}*/}
                    </div>
                    </div>

                    )


                }
