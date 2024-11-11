export const loginRequestObj = (username: any, password: any) => ({
    query: `mutation login($input: LoginInput!) {
        login(input: $input) {
            token
            user {
                id
                companyId
                emailId
                firstName
            }
        }
    }`,
    variables: {
        input: {
            companyId: username,
            password: password,
        },
    },
});
