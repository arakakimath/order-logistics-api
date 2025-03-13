# [1.10.0](https://github.com/arakakimath/order-logistics-api/compare/v1.9.0...v1.10.0) (2025-03-13)


### Bug Fixes

* delivery person could not be null to call property ([7b7044f](https://github.com/arakakimath/order-logistics-api/commit/7b7044f928b4ab7b77c660db842a9ed3d09160e8))
* include undefined ([6a67bbb](https://github.com/arakakimath/order-logistics-api/commit/6a67bbb86e94e88557f25317861dea2d600e7893))
* typescript errors ([8367ee7](https://github.com/arakakimath/order-logistics-api/commit/8367ee71dee30bd7f750a19dad35cf309e58c5ef))
* verify if recipient exists ([355f2eb](https://github.com/arakakimath/order-logistics-api/commit/355f2eb6f9260c0650ecaec84526580333b028f1))


### Features

* add return reason property to order entity ([d75b92d](https://github.com/arakakimath/order-logistics-api/commit/d75b92d9a0ee5f59b7428e74ae809f68418661a3))
* create and findByID methods for in memory orders repository ([8d0bb32](https://github.com/arakakimath/order-logistics-api/commit/8d0bb32b35b61b48a95fcb7f9c4ee2fd1d620967))
* create order controller ([912b160](https://github.com/arakakimath/order-logistics-api/commit/912b160ca0d2dc60b10dc2d42a977f0590b353a7))
* create order use case ([a59114b](https://github.com/arakakimath/order-logistics-api/commit/a59114be95714ccb451bfee736f642f790030c7c))
* delete order use case and unit test ([ba9b772](https://github.com/arakakimath/order-logistics-api/commit/ba9b7726e1b64d3420f9e67a86260c97da4a44b2))
* deliver-order use case and customized errors ([e776103](https://github.com/arakakimath/order-logistics-api/commit/e776103b84add9f5594bce98e33e81c0a4bbee72))
* get order use case and unit test ([a00cb0f](https://github.com/arakakimath/order-logistics-api/commit/a00cb0f59c8d421c72d6a1c99334d97f04f1bc71))
* mongoose repositories and mappers ([44ac622](https://github.com/arakakimath/order-logistics-api/commit/44ac622409bac765c2ca754f2c1d2ae0ebaca5a6))
* mongoose types and schemas ([e6e2ca6](https://github.com/arakakimath/order-logistics-api/commit/e6e2ca6d01e5b700af74809847c266010e5d472f))
* must be admin and order not found errors ([89f0572](https://github.com/arakakimath/order-logistics-api/commit/89f057290925fe0f5b0e8798107dd33ce7977677))
* order entity ([645c902](https://github.com/arakakimath/order-logistics-api/commit/645c902c5aed5290b18604ffdbaae90963ba7c62))
* orders repository interface ([796b04f](https://github.com/arakakimath/order-logistics-api/commit/796b04f64b6931d82c404fb0176ed652c898324b))
* recipient entity and repository interface ([8bbcda8](https://github.com/arakakimath/order-logistics-api/commit/8bbcda84ceb9a5173d563fd9cfa77699a7132076))
* return order use case and unit test ([0dd66ce](https://github.com/arakakimath/order-logistics-api/commit/0dd66cec2d8b302c890b402a0c827eb26cd1162d))
* update order use case and unit test ([6d889d5](https://github.com/arakakimath/order-logistics-api/commit/6d889d5a598d36dd35c4d4228b57b9e5b6dbd3fd))
* uploader interface ([57f8609](https://github.com/arakakimath/order-logistics-api/commit/57f86092ad58bf24b8ea35196065729af514a092))
* withdraw order use case ([c59458e](https://github.com/arakakimath/order-logistics-api/commit/c59458ec7d7b8b638eb656e71b2d50b5a5fa6d64))

# [1.9.0](https://github.com/arakakimath/order-logistics-api/compare/v1.8.0...v1.9.0) (2025-03-06)


### Features

* delete delivery person controller ([00609ec](https://github.com/arakakimath/order-logistics-api/commit/00609ec44d8f4b04473009577e0847afa6b180fa))
* delete delivery person use case ([ad4acd4](https://github.com/arakakimath/order-logistics-api/commit/ad4acd4be11587bf2b69ebd311967c16c297319e))
* delete method for delivery people repository ([5310ed9](https://github.com/arakakimath/order-logistics-api/commit/5310ed92ed899361efd02b71ab9364ff2dedc96e))
* get delivery person controller ([fe9bac2](https://github.com/arakakimath/order-logistics-api/commit/fe9bac23acca3aea78f56f98686220b04dc206d9))
* get delivery person use case ([7e74536](https://github.com/arakakimath/order-logistics-api/commit/7e74536f4aa3f9f9d95bd917a747c9c73d161678))

# [1.8.0](https://github.com/arakakimath/order-logistics-api/compare/v1.7.0...v1.8.0) (2025-03-06)


### Bug Fixes

* delivery person not found error ([ebcb1a3](https://github.com/arakakimath/order-logistics-api/commit/ebcb1a3e086fdb0c8f2915442dfc05e2c3e2ccfa))


### Features

* update delivery person use-case ([12f65f9](https://github.com/arakakimath/order-logistics-api/commit/12f65f99e4becf71ac5c7c77bb3e3db9feb3349b))
* update user controller ([b2a9e03](https://github.com/arakakimath/order-logistics-api/commit/b2a9e034edf11a28d357e86ce1674d546cb2bca4))

# [1.7.0](https://github.com/arakakimath/order-logistics-api/compare/v1.6.0...v1.7.0) (2025-03-06)


### Bug Fixes

* if condition to return error oauth already used ([5b1da65](https://github.com/arakakimath/order-logistics-api/commit/5b1da651f16ec67bc39bf600848c2917ce93885f))
* input changed to the object itself to avoid importing property from undefined ([10f113a](https://github.com/arakakimath/order-logistics-api/commit/10f113a6f73bbd49697b49473d7df37763a2afdd))
* validate payload with zod ([01495a2](https://github.com/arakakimath/order-logistics-api/commit/01495a2a3b0e588dd0e1356eb7b7670164c30d5a))


### Features

* authenticate use case ([f712fdf](https://github.com/arakakimath/order-logistics-api/commit/f712fdf51a1a30ff1e0dbe98a5d580b8f990d746))
* authenticate with github controller ([7ef90aa](https://github.com/arakakimath/order-logistics-api/commit/7ef90aa0d684c27de22bb417a9a91d994644b2a5))
* authenticate with oauth2 use-case ([c27b9d7](https://github.com/arakakimath/order-logistics-api/commit/c27b9d78922bb97c67eb2775b657492c99a22083))
* github oauth2 vars to env validation schema ([a96de64](https://github.com/arakakimath/order-logistics-api/commit/a96de646cc4e552b8f539ea1472c788784d5ada3))
* githubUsername property at domain and mongoose ([b90bafb](https://github.com/arakakimath/order-logistics-api/commit/b90bafb4e1d5312842cfe28d1253c1343071a1c0))
* new methods at delivery people repository ([6f468bf](https://github.com/arakakimath/order-logistics-api/commit/6f468bf697e3eef413eb629e6c7aae8a257d03e3))
* validate jwt token and build req.user even for public routes ([ed78cb7](https://github.com/arakakimath/order-logistics-api/commit/ed78cb7e0d0e2fbd99ca4f6891334398a7a157da))

# [1.6.0](https://github.com/arakakimath/order-logistics-api/compare/v1.5.0...v1.6.0) (2025-03-05)


### Features

* add validation to current user decorator ([c0e8c42](https://github.com/arakakimath/order-logistics-api/commit/c0e8c429c012eb12b50f1236697bc2bfb8f39013))

# [1.5.0](https://github.com/arakakimath/order-logistics-api/compare/v1.4.0...v1.5.0) (2025-03-04)


### Features

* add expiration time in token creation ([57cf173](https://github.com/arakakimath/order-logistics-api/commit/57cf1739c94e0cbe25f767b1b465f0270e996cde))
* create refresh token in authenticate use case ([65cc840](https://github.com/arakakimath/order-logistics-api/commit/65cc840c7830e141f03d278cddb053dc4c6b656d))
* decode method for token-service and related classes ([f0143d7](https://github.com/arakakimath/order-logistics-api/commit/f0143d7ade925b6e9492fb650740a33096753b72))
* refresh token controller ([075e568](https://github.com/arakakimath/order-logistics-api/commit/075e568fc795a35ca9b61e01f9dc57b784115281))
* refresh token use case ([f54b2ac](https://github.com/arakakimath/order-logistics-api/commit/f54b2aca57b2a70e79dd89ef5076488b2ea6c4d1))
* set cookie when authenticating user ([10b7e94](https://github.com/arakakimath/order-logistics-api/commit/10b7e94951ee040e4489b98493f622fbd254a4c8))

# [1.4.0](https://github.com/arakakimath/order-logistics-api/compare/v1.3.0...v1.4.0) (2025-03-03)


### Features

* add role to payload and block non-admin users from creating new ones ([419d849](https://github.com/arakakimath/order-logistics-api/commit/419d8499022084526d4e110628ed4900f6ccb329))

# [1.3.0](https://github.com/arakakimath/order-logistics-api/compare/v1.2.0...v1.3.0) (2025-03-03)


### Bug Fixes

* set authetication controller as public ([8aab37a](https://github.com/arakakimath/order-logistics-api/commit/8aab37a89a5337ed3430f2a8591a1c2d696f9464))


### Features

* current user decorator for extracting info from token payload ([798b966](https://github.com/arakakimath/order-logistics-api/commit/798b9667f9f5b64ce58b7edeeb2fcaa12ea12db9))
* lock all routes by default and set which ones is public ([74bf9ac](https://github.com/arakakimath/order-logistics-api/commit/74bf9ac7d7e4f248f054e58dd5192ce2297131bf))

# [1.2.0](https://github.com/arakakimath/order-logistics-api/compare/v1.1.1...v1.2.0) (2025-03-01)


### Bug Fixes

* add public/private key for test environments ([2e7adb3](https://github.com/arakakimath/order-logistics-api/commit/2e7adb37acb277a3a69ff1c39e1ebd5ef6c95478))
* fake implement hasher n encrypter interfaces at infra to start nest application ([8685b6f](https://github.com/arakakimath/order-logistics-api/commit/8685b6fb3afbbdd5b42f944cea3e503f99bf4d70))
* flag jwt encrypter as injectable for nest issues ([b38bbeb](https://github.com/arakakimath/order-logistics-api/commit/b38bbeb7f5c494d29fb411b04b63ed16481f567a))
* http code for authentication controller ([e1c5504](https://github.com/arakakimath/order-logistics-api/commit/e1c5504424d21eb61dd50c9ff50c162f01d1554d))
* return from getLastDigits as string ([5d3eada](https://github.com/arakakimath/order-logistics-api/commit/5d3eada8f2f9eb2d2b97c4a0fee60edccb8ff670))
* skip main zod validation in test environments ([a9e01d7](https://github.com/arakakimath/order-logistics-api/commit/a9e01d7a972d83484bb7d3fbed392ada0faa1f70))
* throw bad request exception when cpf is invalid ([3630402](https://github.com/arakakimath/order-logistics-api/commit/3630402d21844d700a4ca78a387c98ad0ee6fd87))


### Features

* add cpf validation to register use-case ([efb3f78](https://github.com/arakakimath/order-logistics-api/commit/efb3f784e9d135d72c9795b099cd1ac2f176fed0))
* authenticate use-case and wrong-credentials-error ([ca18425](https://github.com/arakakimath/order-logistics-api/commit/ca18425d5f2fa6b56d48d6c22a9800acc35ba6d4))
* authenticate-controller ([1f9f486](https://github.com/arakakimath/order-logistics-api/commit/1f9f486cb0b2eb09d301cef0bb987e60ca7cce10))
* bcryptjs for hash generator and comparer interfaces ([6f08dfe](https://github.com/arakakimath/order-logistics-api/commit/6f08dfeed2010fb0292d7b25f256ee764aea0503))
* cpf validation ([6ccc91e](https://github.com/arakakimath/order-logistics-api/commit/6ccc91eaac95614beb1c20fef8b450d5f4431eca))
* cpf validation get last digits ([372811a](https://github.com/arakakimath/order-logistics-api/commit/372811a4850120706d536eb2de5aac2d07d59b7d))
* delivery person factory ([bed37d2](https://github.com/arakakimath/order-logistics-api/commit/bed37d23c5e95749705576452eecce31cce4f3ab))
* encrypter interface ([61df112](https://github.com/arakakimath/order-logistics-api/commit/61df112313ceb303c6cc6bd45d51456ca3f5a359))
* generate token and validating, raw authentication controller ([01e6530](https://github.com/arakakimath/order-logistics-api/commit/01e65304d85e9e140f497d35919025150469bc29))
* hash comparer and hash generator interfaces ([d53705f](https://github.com/arakakimath/order-logistics-api/commit/d53705fcae274d6706298d817d5ac745db0f64b9))
* hash password at register delivery person use-case ([dc6f5df](https://github.com/arakakimath/order-logistics-api/commit/dc6f5dfcef38d619185700b7234e3f306e3eaa99))
* implementation of fake hash comparer and generator for unit tests ([22da01e](https://github.com/arakakimath/order-logistics-api/commit/22da01edae4daad1c2c4b386e77f952628b26323))
* jwt authentication with ES256 algorithm setup ([0770e55](https://github.com/arakakimath/order-logistics-api/commit/0770e55df5d322c36dbb592ca95ce951629b8b2c))
* jwt ecdsa private key following algorithm es256 ([681aff6](https://github.com/arakakimath/order-logistics-api/commit/681aff6a991aa87ad710e1e929fbee8c563931a4))
* jwt encrypter; implements Encrypter interface ([ba1fd1e](https://github.com/arakakimath/order-logistics-api/commit/ba1fd1ead4cf57fc6363b8289ab1903cd2606c13))

## [1.1.1](https://github.com/arakakimath/order-logistics-api/compare/v1.1.0...v1.1.1) (2025-02-25)


### Bug Fixes

* NODE_ENV production name ([10669bf](https://github.com/arakakimath/order-logistics-api/commit/10669bf3f23162ea168749cce2e4b5933f1083b6))

# [1.1.0](https://github.com/arakakimath/order-logistics-api/compare/v1.0.0...v1.1.0) (2025-02-25)


### Bug Fixes

* error handling for duplicate cpf ([5421e77](https://github.com/arakakimath/order-logistics-api/commit/5421e7704297f90b1d6ebc5ad2c1c59d483dcd0a))
* return null when can't find user with findByCpf method ([e991804](https://github.com/arakakimath/order-logistics-api/commit/e9918041d5f495e5bc6b47daaf532e5ee4eaef54))


### Features

* add findByCpf method to delivery people repository ([0d7506c](https://github.com/arakakimath/order-logistics-api/commit/0d7506c2fb159e4eb6df0e919c13e6ce45eaadbb))
* throw customized error when trying to create delivery person with already used cpf ([2f68459](https://github.com/arakakimath/order-logistics-api/commit/2f6845905842f7aae734fef2c0b4a8a9d4efbafc))

# 1.0.0 (2025-02-25)


### Bug Fixes

* import path issues ([11c9196](https://github.com/arakakimath/order-logistics-api/commit/11c91960908733cee03c90fb579667de17a6a03a))
* preparing folders for integration ([bc06742](https://github.com/arakakimath/order-logistics-api/commit/bc067428d849caf54ceef01e8c143cc374622f60))
* prevent flooding logs from mongoDB ([3b267de](https://github.com/arakakimath/order-logistics-api/commit/3b267dee52390052ee884259a868203b6e4b041e))
* regenerating package-lock and correcting version issues ([4ea1ff8](https://github.com/arakakimath/order-logistics-api/commit/4ea1ff8f8bd15acea6d740554478e9a04d1c2aa2))
* resolve merge conflicts ([ed681b3](https://github.com/arakakimath/order-logistics-api/commit/ed681b3d82c147c315cd3fc117c6f0e0b49dae71))
* resolve merge conflicts ([cea1a47](https://github.com/arakakimath/order-logistics-api/commit/cea1a4731deee23c30724900672c8f4bfa4575c8))
* updating package-lock.json and package.json according to infrastructure-layer ([fe1153d](https://github.com/arakakimath/order-logistics-api/commit/fe1153d26aeb2e3feb67031e50162bc7a8cfb8e3))


### Features

* integrate create delivery person controller with domain and MongoDB ([c72e2c8](https://github.com/arakakimath/order-logistics-api/commit/c72e2c8df46b42538b2ea95b6a828da9a74eebe6))
* swagger documentation ([109e4dc](https://github.com/arakakimath/order-logistics-api/commit/109e4dc69499ab6a14d2fbf89aecce9e3688149e))
* zod validation pipe ([fbf6188](https://github.com/arakakimath/order-logistics-api/commit/fbf618829fa8d9ef069e3e17369e63e4601c5c17))
