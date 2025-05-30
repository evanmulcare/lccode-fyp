# LCCode - Evan Mulcare FYP

This project is organized into three main directories: `.github`, `client`, and `functions`.

- **`.github`**: Contains the GitHub workflows that automate deployment to `lccode.ie` via Firebase. When code is pushed to the `main` branch, the changes are automatically deployed.
- **`client`**: Contains the Angular code for the website frontend.
- **`functions`**: Contains the Firebase Cloud Function responsible for code execution. This functions interact with a virtual machine running a Docker instance of Judge0 and compare the execution results against test cases.

To run the project, navigate to the `client` folder and run:

```bash
npm run start
```
