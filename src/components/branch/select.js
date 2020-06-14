const colourStyles = {
    container: (base, state) => {
        return {
            boxSizing: "border-box",
            position: 'absolute',
            top: 126,
            left: 400
        }
    },
    control: (base, state) => {
        return {
            boxSizing: "border-box",
            height: 40,
            width: 250,
            border: '1.5px solid #000000',
            borderRadius: 4,
            backgroundColor: '#FFFFFF'
        }
    },
    valueContainer: () => {
        return {
            height: 24,
            width: 100,
            color: '#939393',
            fontFamily: 'Gilroy',
            fontSize: 16,
            letterSpacing: 0,
            lineHeight: 19,
            marginTop: 12,
            marginLeft: 16
        }
    },
    singleValue: () => {
        return {
            height: 24,
            width: 100,
            color: '#3C3C3B',
            fontFamily: 'Gilroy-Bold',
            fontSize: 18,
            fontWeight: 500,
            letterSpacing: 0,
            lineHeight: 19,
            marginTop: -164
        }
    },
    indicatorsContainer: () => {
        return {
            position: 'absolute',
            top: 0,
            left: 200
        }
    },
    indicatorSeparator: () => null,
    dropdownIndicator: (base, state) => {
        return {
            ...base,
            padding: '10px',
            fontSize: '12px'
        }
    },

    input: () => {
        return {
            height: 0,
            width: 0,
            outline: 'none',
            display: 'inline-block',
            cursor: 'pointer',
            marginTop: '-5.04166vw'
        }
    },
    placeholder: () => {
        return {
            height: 24,
            width: 160,
            fontFamily: 'Gilroy',
            fontSize: 18,
            position: 'absolute',
            top: -150
        }
    },
    option: (base, state) => {
        return {
            ...base,
            height: 24,
            width: 250,
            cursor: 'pointer',
            fontFamily: 'Gilroy',
            fontSize: 16,
            padding: 6
        };
    },

    menu: (base, state) => ({
        marginTop: -0.5,
        boxShadow: "0 0px 16px 0 rgba(0,0,0,0.15)",
        backgroundColor: '#FFFFFF'
        
    }),
    menuList: (base, state) => ({
        ...base,
        padding: 0,
        boxShadow: "0 0px 16px 0 rgba(0,0,0,0.15)",
        borderRadius: 8,
        height: 'auto',
        width: 250
    }),
};

module.exports = colourStyles;