export class menu { 

      // Main Menu
      static teachermenu : any [] =
      [
          { menuid: 1, isactive: true, menuname: "होम", menulink: "/report/leaveDashboard", icon: "fas fa-home", hassub: false },
          { menuid: 2, isactive: true, menuname: "अपना प्रोफाइल देखें", menulink: "/teacher/profile", icon: "fas fa-user-alt", hassub: false },
          { menuid: 3, isactive: true, menuname: "अवकाश", menulink: "/teacher/applyLeave", icon: "fas fa-briefcase", hassub: true },
          { menuid: 4, isactive: true, menuname: "रिपोर्ट", menulink: "/report/leaveApplicationStatus", icon: "fas fa-book-reader", hassub: true },
        //   { menuid: 5, isactive: true, menuname: "अवकाश डैशबोर्ड", menulink: "", icon: "fas fa-briefcase", hassub: false },
      ]

       // Sub Menu
    static submenu: any[] =
    [
        { menuid: 3, submenuid: 1, isactive: true, menuname: "आवेदन करें", menulink: "/leave/applyLeave", icon: "far fa-square" },
        { menuid: 3, submenuid: 2, isactive: true, menuname: "आवेदन को आगे बढ़ाएं", menulink: "/leave/extendLeave", icon: "far fa-square" },
        { menuid: 3, submenuid: 3, isactive: true, menuname: "आवेदन निरस्त करें", menulink: "/leave/cancelLeave", icon: "far fa-square" },
        { menuid: 3, submenuid: 3, isactive: true, menuname: "ज्वाइन करें", menulink: "/leave/joinLeave", icon: "far fa-square" },
        { menuid: 4, submenuid: 4, isactive: true, menuname: "अवकाश स्थिति", menulink: "/report/leaveApplicationStatus", icon: "far fa-square" },
        { menuid: 4, submenuid: 5, isactive: true, menuname: "वर्तमान में अवकाश", menulink: "/report/ReportLeaveApplicationHistory", icon: "far fa-square" },
        { menuid: 4, submenuid: 6, isactive: true, menuname: "अवकाश की जानकारी", menulink: "/report/HolidayInformationReport", icon: "far fa-square" },

        // Principal Sub Menu
        { menuid: 8, submenuid: 1, isactive: true, menuname: "आवेदन करें", menulink: "/leave/applyLeave", icon: "far fa-square" },
        { menuid: 8, submenuid: 2, isactive: true, menuname: "आवेदन को आगे बढ़ाएं", menulink: "/leave/extendLeave", icon: "far fa-square" },
        { menuid: 8, submenuid: 3, isactive: true, menuname: "आवेदन निरस्त करें", menulink: "/leave/cancelLeave", icon: "far fa-square" },
        { menuid: 8, submenuid: 3, isactive: true, menuname: "ज्वाइन करें", menulink: "/leave/joinLeave", icon: "far fa-square" },
        { menuid: 9, submenuid: 4, isactive: true, menuname: "अवकाश स्थिति", menulink: "/report/leaveApplicationStatus", icon: "far fa-square" },
        { menuid: 9, submenuid: 5, isactive: true, menuname: "वर्तमान में अवकाश", menulink: "/report/ReportLeaveApplicationHistory", icon: "far fa-square" },
        { menuid: 9, submenuid: 6, isactive: true, menuname: "अवकाश की जानकारी", menulink: "/report/HolidayInformationReport", icon: "far fa-square" },

         // State Admin Sub Menu

    ]

    static Principalmenu : any [] =
    [
        { menuid: 6, isactive: true, menuname: "होम", menulink: "/report/leaveDashboard", icon: "fas fa-home", hassub: false },
        { menuid: 7, isactive: true, menuname: "अपना प्रोफाइल देखें", menulink: "/principal/p_profile", icon: "fas fa-user-alt", hassub: false },
        { menuid: 8, isactive: true, menuname: "अवकाश", menulink: "/leave/applyLeave", icon: "fas fa-briefcase", hassub: true },
        { menuid: 9, isactive: true, menuname: "रिपोर्ट", menulink: "/report/leaveApplicationStatus", icon: "fas fa-book-reader", hassub: true },
        { menuid: 10, isactive: true, menuname: "कार्यवाही करे", menulink: "/leave/approveLeave", icon: "fas fa-briefcase", hassub: false },
    ]

    static StateAdminmenu : any [] =
    [
        { menuid: 11, isactive: true, menuname: "होम", menulink: "/state-admin/s_home", icon: "fas fa-home", hassub: false },
        { menuid: 12, isactive: true, menuname: "अपना प्रोफाइल देखें", menulink: "/state-admin/s_profile", icon: "fas fa-user-alt", hassub: false },
        { menuid: 13, isactive: true, menuname: "अवकाश की जानकारी", menulink: "/report/HolidayInformationReport", icon: "fas fa-book-reader", hassub: false },
        { menuid: 14, isactive: true, menuname: "कार्यवाही करे", menulink: "/state-admin/s_approveleave", icon: "fas fa-briefcase", hassub: false },
        // { menuid: 15, isactive: true, menuname: "रिपोर्ट", menulink: "", icon: "fas fa-briefcase", hassub: true },
    ]
}

