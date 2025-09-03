export const getRoleName = (id_role) => {
    switch (Number(id_role)) {
        case 1:
            return "Admin";
        case 2:
            return "Guru";
        case 3:
            return "Alumni";
        case 4:
            return "Siswa";
        default:
            return "Unknown";
    }
}

export const getStatus = (status) => {
    switch (Number(status)) {
        case 1:
            return "Master";
        case 2:
            return "Aktif";
        case 3:
            return "Lulus";
        default:
            return "Unknown";
    }
}