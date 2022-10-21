---
sidebar_position: 2
---


# Paillier

*** A low-level optimized implementation of the Paillier cryptosystem ***

:::tip The main basis of the paper

Ma H, Han S, Lei H. Optimized Paillier's Cryptosystem with Fast Encryption and Decryption[C]//Annual Computer Security Applications Conference. 2021: 106-118.

:::


:::tip 💐 Acknowledge

Thanks to Huanyu ma of Ant Group and Cheng Hong of Alibaba Gemini Lab for their help and guidance in the process of implementation and optimization.

:::

## c++ API

### opt_paillier_keygen
This function implements an improved key generation logic to efficiently generate 112 bit key pairs.

### opt_paillier_set_plaintext, opt_paillier_get_plaintext
 The set function encodes positive and negative integers into the plaintext field. The get function encodes the plaintext field into an integer.

### opt_paillier_encrypt
This function implements the encryption algorithm without using the private key

### opt_paillier_encrypt_crt
When the encryption party uses its own public key to encrypt, it can call the encryption optimization implementation based on the Chinese Remainder theorem that requires the private key.

### opt_paillier_encrypt_crt_fb
Based on fixed-base optimization algorithm, the sliding window size is set to 4 bit, and the Chinese remainder theorem optimization is used to further improve the encryption efficiency.

### opt_paillier_decrypt
This function implements the Paillier decryption algorithm

### opt_paillier_decrypt_crt
This function implements the decryption optimization algorithm based on the Chinese Remainder theorem. In addition, it implements the exponential optimization algorithm on the modular decomposition of composite.

### opt_paillier_add
This function implements homomorphic addition, which takes two ciphertexts and outputs the ciphertext result of homomorphic addition.

### opt_paillier_constant_mul
This function implements constant multiplication, where op1 is the ciphertext and op2 is the plaintext, and outputs op2 multiplied by the encrypted plaintext of op1.

### opt_paillier_freepubkey，opt_paillier_freeprvkey
This is the release interface for memory resources.

## Python API
### opt_paillier_c2py_warpper

##### class Opt_paillier_public_key(object)

> Opt Paillier Public key class: Stores information about the public key.

##### class Opt_paillier_secret_key(object)

> Opt Paillier Private Key class: Stores information about the private key.

##### class Opt_paillier_ciphertext(object)

> Opt Paillier ciphertext class: Stores the information of the ciphertext.

##### function opt_paillier_keygen(k_sec)

> Public and private key pair generation function
>
> **Parameters**：k_sec - Cryptographic identifier; default is 112
> 
> **Returns**：
> 
> pub - Opt_paillier_public_key
> 
> prv - Opt_paillier_secret_key 

##### function opt_paillier_encrypt_crt(pub, prv, plain_text)

>CRT encryption function: This encryption function optimizes the encryption process using both the public and private keys
>
>**Parameters**：
> pub - Opt_paillier_public_key, 
> 
> prv - Opt_paillier_secret_key, 
> 
> plain_text - int Up to 2048 bits are supported
>
>**Returns**：
> 
> cipher_text - Opt_paillier_ciphertext

##### function opt_paillier_encrypt(pub, plain_text)

> Encryption function: Encrypts plain_text with the public key
> **Parameters**：
> pub - Opt_paillier_public_key
> 
> plain_text - int Up to 2048 bits are supported
> **Returns**：cipher_text - Opt_paillier_ciphertext 

##### function opt_paillier_decrypt_crt(pub, prv, cipher_text):

> Decryption function: Decrypt the ciphertext using both public and private keys
> **Parameters**：
> 
> pub - Opt_paillier_public_key
> 
> prv - Opt_paillier_secret_key
> 
> cipher_text- Opt_paillier_ciphertext
> **Returns**：decrypt_text_num - int :Decrypted integer plaintext

##### function opt_paillier_add(pub, op1_cipher_text, op2_cipher_text)

> Ciphertext addition function: computes the homomorphic addition of two ciphertexts
> **Parameters**：
> 
> pub - Opt_paillier_public_key
> 
> op1_cipher_text - Opt_paillier_ciphertext
> 
> op2_cipher_text- Opt_paillier_ciphertext
> 
> **Returns**：add_res_cipher_text - Opt_paillier_ciphertext:The ciphertext of the homomorphism of the two ciphertexts plus the result

##### opt_paillier_c2py_test.py

*** opt_paillier_c2py_warpper的python调用demo ***

```bash
cd {your location}/primihub
bazel build --config=linux :opt_paillier_c2py_test // compile opt_paillier_c2py_warpper call demo
bazel-bin/opt_paillier_c2py_test // run demo
```

demo executes the resulting instance

```bash
==================KeyGen is finished==================
KeyGen costs: 565.9785270690918 ms.
=========================opt test=========================
The avg encrypt_crt  cost is 1.5224823951721191 ms.
The avg encryption   cost is 4.612508535385132 ms.
The avg add_cost     cost is 0.7267651557922363 ms.
The avg decrypt_cost cost is 1.9465057849884033 ms.
checked: [1, 1, 1, 1]
========================================================
```

### opt_paillier_pack_c2py_warpper

##### class Opt_paillier_pack_ciphertext(object)

>	Opt Paillier packet ciphertext class: Stores information about the packet ciphertext. Multiple plaintexts are packaged and then encrypted to obtain a ciphertext, which is called packet ciphertext.
> 
>	Attributes：	
> ciphertexts - Cipher list.由于Opt Paillier的密文域有限，当明文数量超过阈值时，实际加
> 得到的是密文列表。
>
> pack_size - The number of plaintexts in the ciphertext of the packet
>
> crtMod - Ciphertext packing parameters

##### function **opt_paillier_pack_encrypt_crt**(pub, prv, plain_text_list, crt_mod = None):
> CRT bundle encryption function: This function optimizes the bundle encryption process using both public and private keys. Multiple plaintexts are encrypted into a single packet ciphertext.
>  **Parameters**：
> 
> pub - Opt_paillier_public_key
> 
> prv - Opt_paillier_secret_key
> 
> plain_text_list - A list of encrypted plaintexts, each of which is an int with a maximum size of 70 bits
> 
> crt_mod - Package ciphertext packaging parameter, if provided, use the passed packaging parameter for plaintext packaging and encryption, otherwise use a random crt_mod
>
> **Returns**：
> 
> pack_ciphertext - Opt_paillier_pack_ciphertext: pack_ciphertext. If crt_mod is passed，pack_ciphertext.crtMod=crt_mod。

##### function opt_paillier_pack_encrypt(pub, plain_text_list, crt_mod = None):

> 
> Packing encryption function: This encryption function encrypts a batch of plaintext using a public key. Multiple plaintexts in a batch are encrypted into a single packet ciphertext.
> 
> **Parameters**：
> 
> pub - Opt_paillier_public_key
> 
> plain_text_list - A list of encrypted plaintexts, each of which is an int with a maximum size of 70 bits
> 
> crt_mod - Package_ciphertext packaging parameter, if provided, use the passed packaging parameter for plaintext packaging and encryption, otherwise use a random crt_mod
> 
> **Returns**：
> 
> pack_ciphertext - Opt_paillier_pack_ciphertext :package_cipher.If crt_mod is passed，pack_ciphertext.crtMod=crt_mod。

##### function opt_paillier_pack_decrypt_crt(pub, prv, pack_cipher_text)

> Packet decryption function: Decrypt the packet _ciphertext using both public and private keys
> 
> **Parameters**：
> 
> pub - Opt_paillier_public_key
> 
> prv - Opt_paillier_secret_key
> 
> pack_cipher_text - Opt_paillier_pack_ciphertext
> 
> **Returns**：decrypt_text_num_list - list : A list of decrypted integer plaintexts

##### function opt_paillier_pack_add(pub, op1_pack_cipher_text, op2_pack_cipher_text)

> Packet_ciphertext addition function: computes the homomorphic addition of two packet_ciphertexts. The two opt_paillier_pack_ciphertexts passed in should have the same pack_size and crtMod. Numbers at the same position within the two Opt_paillier_pack_ciphertext packages are added together.
> 
>**Parameters**：
> 
> pub - Opt_paillier_public_key
> 
> op1_pack_cipher_text - Opt_paillier_pack_ciphertext
> 
> op2_pack_cipher_text - Opt_paillier_pack_ciphertext
> 
>**Returns**：add_res_cipher_text - Opt_paillier_pack_ciphertext:The homomorphism of two packet ciphertexts plus the resulting packet ciphertext

##### opt_paillier_pack_c2py_test.py

opt_paillier_pack_c2py_warpper的python调用demo

```bash
cd {your location}/primihub
bazel build --config=linux :opt_paillier_pack_c2py_test // compile opt_paillier_pack_c2py_warpper call demo
bazel-bin/opt_paillier_pack_c2py_test // run demo
```

demo executes the resulting instance

```bash
==================KeyGen is finished==================
KeyGen costs: 886.4307403564453 ms.
=========================opt test=========================
The avg encryption cost is 91.69797420501709 ms.
The avg decryption cost is 46.557745933532715 ms.
The avg addition   cost is 1.897873878479004 ms.
========================================================
```
