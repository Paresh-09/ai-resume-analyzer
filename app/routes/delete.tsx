import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { usePuterStore } from "../../lib/puter";

const DeleteResume = () => {
    const { id } = useParams();
    const { fs, kv } = usePuterStore();
    const navigate = useNavigate();

    useEffect(() => {
        const deleteResume = async () => {
            if (id) {
                const resume = await kv.get(`resume:${id}`);
                if (resume) {
                    const parsedResume = JSON.parse(resume) as Resume;
                    await fs.delete(parsedResume.imagePath);
                    await kv.delete(`resume:${id}`);
                }
                navigate("/");
            }
        };
        deleteResume();
    }, [id, fs, kv, navigate]);

    return <div>Deleting...</div>;
};

export default DeleteResume;