---
sidebar_position: 2
---


# Paillier

*** Underlying optimization implementation of Paillier cryptosystem ***

:::tip Reference

Ma H, Han S, Lei H. Optimized Paillier's Cryptosystem with Fast Encryption and Decryption[C]//Annual Computer Security Applications Conference. 2021: 106-118.

:::


:::tip 💐 Thank

 Thanks to Ant Group Huanyu ma and Alibaba Gemini Lab Cheng Hong for their help and guidance in the implementation and optimization process.

:::

## c++ API

### opt_paillier_keygen
This function implements an improved key generation logic that supports efficient generation of key pairs with a security level of 112 bits.

### opt_paillier_set_plaintext, opt_paillier_get_plaintext
The *set* function implements the encoding of positive and negative integers to the plaintext domain. The get function implements the encoding of plaintext fields to integers.

### opt_paillier_encrypt
Implemented an encryption algorithm that does not require private key participation.

### opt_paillier_encrypt_crt
When the encryption party uses its own public key to encrypt, it can call the encryption optimization implementation based on the Chinese remainder theorem that requires the participation of the private key.

### opt_paillier_encrypt_crt_fb
Based on the fixed-base optimization algorithm, the sliding window size is set to 4 bits, and the Chinese remainder theorem optimization is used, which can further improve the encryption efficiency.

### opt_paillier_decrypt
Implemented Paillier decryption algorithm

### opt_paillier_decrypt_crt
The decryption optimization algorithm based on the Chinese remainder theorem is implemented, and the exponential optimization algorithm is implemented on the composite modulus decomposition.

### opt_paillier_add
The homomorphic addition is implemented, and two ciphertexts need to be passed in, and the ciphertext result of the homomorphic addition is output.

### opt_paillier_constant_mul
A constant multiplication is implemented, where op1 is the ciphertext and op2 is the plaintext, and outputs the encrypted state result of the plaintext encrypted by op2 multiplied by op1.

### opt_paillier_freepubkey，opt_paillier_freeprvkey
Release interface for memory resources.

## Python API
### opt_paillier_c2py_warpper

##### class Opt_paillier_public_key(object)

> Opt Paillier public key class: stores the information of the public key.

##### class Opt_paillier_secret_key(object)

> Opt Paillier Private Key Class: Stores private key information.

##### class Opt_paillier_ciphertext(object)

> Opt Paillier ciphertext class: Stores ciphertext information.

##### function opt_paillier_keygen(k_sec)

> Public-private key pair generation function
>
> **Parameters**：k_sec - encryption id, default is 112
> 
> **Returns**：
> 
> pub - Opt_paillier_public_key
> 
> prv - Opt_paillier_secret_key 

##### function opt_paillier_encrypt_crt(pub, prv, plain_text)

>CRT encryption function: This encryption function will use both public and private keys to optimize the encryption process
>
>**Parameters**：
> 
> pub - Opt_paillier_public_key, 
> 
> prv - Opt_paillier_secret_key, 
> 
> plain_text - int (Maximum support 2048 bits)
>
>**Returns**：
> 
> cipher_text - Opt_paillier_ciphertext

##### function opt_paillier_encrypt(pub, plain_text)

> Encryption function: encrypt plaintext plain_text using public key
>
> **Parameters**：
> 
> pub - Opt_paillier_public_key
> 
> plain_text - int (Maximum support 2048 bits)
> **Returns**：cipher_text - Opt_paillier_ciphertext 

##### function opt_paillier_decrypt_crt(pub, prv, cipher_text):

> Decryption function: decrypt the ciphertext using the public and private keys at the same time
> 
> **Parameters**：
> 
> pub - Opt_paillier_public_key
> 
> prv - Opt_paillier_secret_key
> 
> cipher_text- Opt_paillier_ciphertext
> 
> **Returns**：decrypt_text_num - int Decrypted integer plaintext

##### function opt_paillier_add(pub, op1_cipher_text, op2_cipher_text)

> Ciphertext addition function: computes the homomorphic addition of two ciphertexts
>
> **Parameters**：
> 
> pub - Opt_paillier_public_key
> 
> op1_cipher_text - Opt_paillier_ciphertext
> 
> op2_cipher_text- Opt_paillier_ciphertext
> 
> **Returns**：add_res_cipher_text - Opt_paillier_ciphertext (The ciphertext of the homomorphic addition of two ciphertexts)

##### opt_paillier_c2py_test.py

*** The python call demo of opt_paillier_c2py_warpper ***

```bash
cd {your location}/primihub
bazel build --config=linux :opt_paillier_c2py_test // compile opt_paillier_c2py_warpper call demo
bazel-bin/opt_paillier_c2py_test // run demo
```

demo execution result example

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

>	Opt Paillier package ciphertext class: stores the information of the package ciphertext. Pack multiple pieces of plaintext, and then encrypt to get a ciphertext, which is called a package ciphertext.
> 
>	Attributes：	
> ciphertexts - List of ciphertexts. Due to the limited ciphertext field of Opt Paillier, when the number of plaintext exceeds the threshold, the actual
> What is obtained is a list of ciphertexts.
>
> pack_size - The amount of plaintext contained in the ciphertext of the packet
>
> crtMod - Ciphertext Packing Parameters

##### function **opt_paillier_pack_encrypt_crt**(pub, prv, plain_text_list, crt_mod = None):
> CRT package encryption function: This encryption function will use both public and private keys to optimize the package encryption process. Multiple plaintexts are encrypted into one packet ciphertext.
>
>  **Parameters**：
> 
> pub - Opt_paillier_public_key
> 
> prv - Opt_paillier_secret_key
> 
> plain_text_list - Packed encrypted plaintext list, each plaintext is of type int, each int can be up to 70bit
> 
> crt_mod - Packet ciphertext packing parameter, if provided, use the incoming packing parameter to pack and encrypt the plaintext, otherwise use a random crt_mod
>
> **Returns**：
> 
> pack_ciphertext - Opt_paillier_pack_ciphertext Packet ciphertext. If crt_mod is passed in, pack_ciphertext.crtMod=crt_mod.

##### function opt_paillier_pack_encrypt(pub, plain_text_list, crt_mod = None):

> 
> Packing encryption function: This encryption function uses the public key to pack and encrypt a batch of plaintexts. Multiple plaintexts in a batch are encrypted into one packet ciphertext.
> 
> **Parameters**：
> 
> pub - Opt_paillier_public_key
> 
> plain_text_list - Packed encrypted plaintext list, each plaintext is of type int, each int can be up to 70bit
> 
> crt_mod - Packet ciphertext packing parameter, if provided, use the incoming packing parameter to pack and encrypt the plaintext, otherwise use a random crt_mod
> 
> **Returns**：
> 
> pack_ciphertext - Opt_paillier_pack_ciphertext Packet ciphertext。If crt_mod is passed in,pack_ciphertext.crtMod=crt_mod。

##### function opt_paillier_pack_decrypt_crt(pub, prv, pack_cipher_text)

> Packet decryption function: use the public and private keys to decrypt the packet ciphertext at the same time
> 
> **Parameters**：
> 
> pub - Opt_paillier_public_key
> 
> prv - Opt_paillier_secret_key
> 
> pack_cipher_text - Opt_paillier_pack_ciphertext
> 
> **Returns**：decrypt_text_num_list - list (Decrypted integer plaintext list)

##### function opt_paillier_pack_add(pub, op1_pack_cipher_text, op2_pack_cipher_text)

> Packet ciphertext addition function: Computes the homomorphic addition of two packet ciphertexts. The two incoming Opt_paillier_pack_ciphertext should have the same pack_size and crtMod. Numbers at the same position in the two Opt_paillier_pack_ciphertext packs are added together.
> 
>**Parameters**：
> 
> pub - Opt_paillier_public_key
> 
> op1_pack_cipher_text - Opt_paillier_pack_ciphertext
> 
> op2_pack_cipher_text - Opt_paillier_pack_ciphertext
> 
>**Returns**：add_res_cipher_text - Opt_paillier_pack_ciphertext (The packet ciphertext of the result of the homomorphic addition of the two packet ciphertexts)

##### opt_paillier_pack_c2py_test.py

The python call demo of opt_paillier_pack_c2py_warpper

```bash
cd {your location}/primihub
bazel build --config=linux :opt_paillier_pack_c2py_test // Compile opt_paillier_pack_c2py_warpper to call demo
bazel-bin/opt_paillier_pack_c2py_test // run demo
```

demo execution result example

```bash
==================KeyGen is finished==================
KeyGen costs: 886.4307403564453 ms.
=========================opt test=========================
The avg encryption cost is 91.69797420501709 ms.
The avg decryption cost is 46.557745933532715 ms.
The avg addition   cost is 1.897873878479004 ms.
========================================================
```
