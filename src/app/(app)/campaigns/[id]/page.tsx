import ButtonGroup from "@/components/buttonsGroup";
import CreatorCard from "@/components/creatorCard";
import OverviewCampaign from "@/components/overviewCampaign";
import TitlePage from "@/components/titlePage";



export default async function CampaignPage({ params }: { params: { id: number } }) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/postsFromDb`)
    const posts = await res.json()

    return (
        <div className="flex flex-col justify-center items-center">
            <TitlePage title="Test Campaign" />
            <ButtonGroup />
            <OverviewCampaign/>
            <ButtonGroup />
            <CreatorCard posts={posts}/>
        </div>
    );
}