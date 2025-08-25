import { Select, MenuItem } from '@mui/material';

/* eslint-disable react/prop-types */
const MobileSort = ({ value, onChange }) => {
  return (
    <Select
      value={value || 'benefix'} // 기본값을 할인순으로 설정
      defaultValue="benefix" // 기본값 명시적 설정
      displayEmpty // 빈 값일 때도 표시
      size="small"
      variant="outlined"
      onChange={(e) => onChange(e.target.value)}
      sx={{
        minWidth: 90,
        height: 32,
        borderRadius: '12px',
        fontFamily: 'pre-semibold',
        fontSize: 14,
        color: '#6e738c',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
        '& .MuiSelect-select': { py: '4px', pr: '24px', pl: '8px' },
        '& .MuiSvgIcon-root': { right: 6, color: '#6e738c' },
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            borderRadius: '12px',
            boxShadow: '0 6px 24px rgba(0,0,0,0.12)',
            mt: 1,
          },
        },
        MenuListProps: {
          sx: {
            py: 0,
            '& .MuiMenuItem-root': {
              py: 1.25,
              px: 2,
              fontFamily: 'pre-medium',
              fontSize: 15,
              color: '#6E738C',
            },
            '& .MuiMenuItem-root:not(:last-of-type)': {
              borderBottom: '1px solid #eee',
            },
          },
        },
      }}
    >
      <MenuItem value="benefix">할인순</MenuItem>
      <MenuItem value="popular">인기순</MenuItem>
    </Select>
  );
};

export default MobileSort;
