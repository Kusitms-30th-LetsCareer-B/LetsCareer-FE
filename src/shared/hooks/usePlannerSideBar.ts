import { useLocation, useNavigate } from 'react-router-dom';
import home from "../../shared/assets/home.png";
import calendar from "../../shared/assets/calendar.png";
import folder from "../../shared/assets/folder.png";
import chart from "../../shared/assets/chart.png";
import homeActive from "../../shared/assets/homeActive.png";
import calendarActive from "../../shared/assets/CalendarActive.png";
import folderActive from "../../shared/assets/folderActive.png";
import chartActive from "../../shared/assets/chartActive.png";

export const usePlannerSideBar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path: string): boolean => location.pathname === path;

    const getPath = (path: string): string => {
        return `flex items-center border-separate rounded-lg cursor-pointer py-[12px] px-[18px] gap-[16px] 
                ${isActive(path) ? 'bg-primary-10 text-primary-100 border border-neutral-80' : 'text-neutral-45'}`;
    };

    const getIcon = (path: string): string => {
        if (isActive(path)) {
            switch (path) {
                case '/home':
                    return homeActive;
                case '/calendar':
                    return calendarActive;
                case '/status':
                    return chartActive;
                case '/setting':
                    return folderActive;
                default:
                    return '';
            }
        } else {
            switch (path) {
                case '/home':
                    return home;
                case '/calendar':
                    return calendar;
                case '/status':
                    return chart;
                case '/setting':
                    return folder;
                default:
                    return '';
            }
        }
    };


    const navigateTo = (path: string) => {
        navigate(path);
    };

    return {
        getIcon,
        getPath,
        navigateTo,
    };
};