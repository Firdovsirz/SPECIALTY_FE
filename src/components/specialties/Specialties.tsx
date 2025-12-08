import { Link } from "react-router";
import Stack from '@mui/material/Stack';
import { Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import Pagination from '@mui/material/Pagination';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { getSpecialtiesByCafedra, getAllSpecialties, Specialty } from "../../services/specialty/specialtyService";

export default function Specialties() {
    const [end, setEnd] = useState<number>(6);
    const [start, setStart] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [specialties, setSpecialties] = useState<Specialty[]>([]);
    const role = useSelector((state: RootState) => state.auth.role);
    const [specailtyLength, setSpecialtyLength] = useState<number>(0);
    const token = useSelector((state: RootState) => state.auth.token);
    const cafedra_code = useSelector((state: RootState) => state.auth.cafedra_code);

    useEffect(() => {
        try {
            setLoading(true);
            if (role === 2) {
                getSpecialtiesByCafedra(
                    cafedra_code ? cafedra_code : "",
                    token ? token : "",
                    start,
                    end
                )
                    .then((res) => {
                        if (typeof res === "object" && res.specialties) {
                            setSpecialties(res.specialties);
                            setSpecialtyLength(res.total_specialties);
                        } else {
                            setSpecialties([]);
                        }
                    })
                    .finally(() => setLoading(false));
            } else if (role === 1) {
                getAllSpecialties(token ? token : "")
                    .then(setSpecialties)
                    .finally(() => setLoading(false));
            }
        } catch (err) {
            setSpecialties([]);
            setLoading(false);
        }
    }, []);

    return (
        <>
            <div className="flex flex-wrap">
                {loading ? (
                    Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="w-[48%] m-2 p-4 flex justify-between items-center 
                            bg-blue-100 border-2 border-blue-200 rounded-[15px]"
                        >
                            <Skeleton variant="text" width="70%" />
                            <Skeleton variant="circular" width={25} height={25} />
                        </div>
                    ))
                ) : (
                    specialties.map((specialty, index) => (
                        <div
                            key={index}
                            className="w-[48%] m-2 p-4 flex justify-between items-center 
                            bg-blue-500 text-white border-2 border-blue-500 rounded-[15px]
                            transition-colors duration-300
                            hover:bg-white hover:text-blue-500
                            cursor-pointer"
                        >
                            <Link to={"/specialty-details"} state={{ specialtyCode: specialty.specialty_code, specialtyName: specialty.specialty_name }} className="flex justify-between w-full">
                                <div>
                                    {specialty.specialty_name} ({specialty.specialty_code})
                                </div>
                                <div>
                                    <ArrowOutwardIcon sx={{ fontSize: 25 }} />
                                </div>
                            </Link>
                        </div>
                    ))
                )}
            </div>
            <div className="flex justify-center items-center">
                <Stack spacing={2}>
                    <Pagination
                        count={specailtyLength ? (specailtyLength <= 6 ? 1 : Math.ceil(specailtyLength / 6)) : 1}
                        page={Math.floor(start / (end - start)) + 1}
                        onChange={(_event, page) => {
                            const pageSize = end - start;
                            const newStart = (page - 1) * pageSize;
                            const newEnd = newStart + pageSize;
                            setStart(newStart);
                            setEnd(newEnd);
                            setLoading(true);
                            getSpecialtiesByCafedra(
                                cafedra_code ? cafedra_code : "",
                                token ? token : "",
                                start,
                                end
                            )
                                .then((res) => {
                                    if (typeof res === "object" && res.specialties) {
                                        setSpecialties(res.specialties);
                                        setSpecialtyLength(res.total_specialties);
                                    } else {
                                        setSpecialties([]);
                                    }
                                })
                                .finally(() => setLoading(false));
                        }}
                        sx={{
                            '& .MuiPaginationItem-root': {
                                color: 'text.primary',
                                bgcolor: 'background.paper',
                            },
                            '& .MuiPaginationItem-root.Mui-selected': {
                                bgcolor: 'primary.main',
                                color: 'primary.contrastText',
                                '&:hover': {
                                    bgcolor: 'primary.dark',
                                },
                            },
                            '& .MuiPaginationItem-root:hover': {
                                bgcolor: 'action.hover',
                            },
                        }}
                    />
                </Stack>
            </div>
        </>
    );
}