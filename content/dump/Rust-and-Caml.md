+++
title = "Zero Knowledge Proofs"
date = "2025-05-20"

[taxonomies]
tags=["security", "blockchain"]

[extra]
comment = true
+++

Zero Knowledge Proofs : wait what ? The name sounds absurd isnt it? It didnt to me somehow lol.

Let us first build our basics on secret sharing : Suppose Alice and Bob want decide to date each other, they send a bit (0/1) indicating whether or not each wants to date. This problem can be simply modelled as taking the AND of two bits (Obviously, both have to agree!) Note that Bob is scared of rejection and does not want to be embarrased if his response was a 1 but Alice's was 0 ... Suppose Alice and Bob simply send their bits to a trusted Charlie (and not revealing it to each other) who does the AND and sends the result to both. In the sad case where Alice does send a 0, there is no way for her to determine whether Bob sent a 0 or a 1 since the answer in both cases is the same. 
This forms the basis of 'indistinguishability' in cryptography.

Now coming to proofs. Suppose you owe me some money, and pay me back by transferring back to my account. I ask you for a proof or a justification for your transaction. One simple way would be that you show me your previous account balance, the transaction receipt issued, and the current account balance, to make sure all is in place. But you dont like it. I can **see** your huge bank balance and deny you lending money the next time :|. 

So you want to prove to me that you correctly paid me the money I deserved without showing any of the sensitive details like bank account etc. This is precisely what a zero knowledge proof does. 

> More formally,
> a zero knowledge proof is a proof to a statement "$\exists w $ such that for given input $x$ and a circuit $C$, $C(x,w) = 0$" 

Moreover the "verifier" of the proof should not be able to *distinguish* between two candidate $w_1$ and $w_2$ that satisfy the above definition. 
<br />
<br />
<br />
*Wait wait wait, what from dating and banking to circuits ??? Have patience buddy, we ll get there slowly...*

A serious extension to the above example is transactions on a blockchain. All transactions should be publicly verifiable, but none should reveal personal details of the user. For those new to blockchains, think about a network of nodes interconnected, each having some assets that is transferrable across nodes and the amount of money in the blockchain is fixed. Money is neither created nor destroyed. Simple, just like another economy. 
What is the difference, I do not have to go to a central agency to mediate transactions, everyone peer can transact with another peer, without restriction. 

What this provides is excellent fault tolerance, in traditional (aka centralized) banking, there is single point failure. The bank gone $\Rightarrow$ all the people associated are gone with it too! But in a decentralized economy like blockchains, this is not the case.
All sounds good ? The real problem starts now. Since there is no central controlling agency, I can make FALSE transactions and overspend - 'make money' out of thin air! 

A trivial solution to that would be show all your transactions to everyone and make your account public. But this has two serious problems :
1. Breach of privacy - cant show account details publicly
2. Network delays - since nodes are connected with different connection bandwidths, for any two nodes to settle on a transaction they have to wait for the farthest node to see the message of a transaction -- too slow -- NO! 

Now comes our ZKP hero:

A fix for the first is to set up a zero knowledge proof for a statement that "the given transaction from Node A to Node B is valid", let us not get into the details of valid is, but I hope that the above makes sense. So this ensures validity of a payment while maintaining privacy - best of both worlds.

A fix for (2) is achieved through a high level transformation called a **Fiat-Shamir transformation** on the proof which renders it non interactive. What this means is that before inorder to prove the correctness of the transaction I would have to interact with every other node, "talk" to them and convince them that "Hey, the transfer is sound, here is a proof!". But by using the FST, this conversation can, be simplified into a bunch of statements that a verifer (someone who is not involved in the transaction lets say) can sit down and verify whenever it reaches him. The latter is called an "argument" as opposed to a proof. 

This is a neat and easy way to figure this out ! But how exactly does this happen ? How does a Zero Knowledge Proof look like? Well mind you, there is some gameplay of words here, all this is based on cryptographic assumptions and correctness with some probability -- more on these details in a later post!

Thanks for reading.

# Bibliography
- [Proofs Arguments and Zero Knowledge](https://people.cs.georgetown.edu/jthaler/ProofsArgsAndZK.pdf) by [Justin Thaler](https://people.cs.georgetown.edu/jthaler/)
- [ZKP MOOC](https://rdi.berkeley.edu/zk-learning/)
