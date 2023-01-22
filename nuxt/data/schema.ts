
namespace Schema {
    interface Rule {
        rule: string;
        field: string;
        error: string;
    }

    export interface ContactForm7 {
        version: string;
        locale: string;
        rules: Rule[];
    }

}

export default Schema