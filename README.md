# The Scatter
The on-chain Blog 

## Installation & Usage

1. Clone the project

    ```
    git clone https://github.com/harshanas/the-scatter.git
    ```

2. Install Dependencies
    ```
    npm install
    ```

3. Run the frontend
    ```
    npm run dev
    ```

4. Run the backend
    ```
    npx hardhat node
    ```

5. Deploy the contract
    ```
    npx hardhat run scripts/deploy.js --network localhost
    ```

6. Add the first address in the hardhat server into your metamask.

7. Navigate to `http://localhost:3000`
## Testing

1. Smart Contract

    ```
    npx hardhat test
    ```