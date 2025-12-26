package com.example.MovieReview.Controllers;

import java.util.List;
import java.util.Random;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.MovieReview.Entity.Messages;

@RestController
public class MessageController {
	
	private static final List<String> MESSAGES = List.of(
            "Movies are a gateway to emotions.",
            "Zindagi badi honi chahiye, lambi nahi.",
            "Jo darr gaya samjho marr gaya.",
            "Tumhara time aayega!",
            "It’s not who I am underneath, but what I do that defines me",
            "The greatest thing you'll ever learn is just to love and be loved in return.",
            "Naa peru Pushpa... Pushpa Raj. Thaggede le!",
            "Life mein sabse bada risk hota hai... koi risk na lena.",
            "Life lo oka sari commit ayipote… nenu na mata vinanu.",
            "Aapna time aayega!",
            "Gelupu manadi kakapoyina... poratam manadi.",
            "Manishi talent tho kadhu… try cheyadam tho success avuthadu.",
            "Insaan ko uski koshishon se pehchano, kamiyabi se nahi.",
            "Tum log mujhe dhundh rahe ho, aur main tumhara yahan intezaar kar raha hoon.",
            "Mard banne ke liye jigar chahiye... gender nahi.",
            "Kisi cheez ko agar dil se chaho, toh puri kaaynaat usse tumse milane ki koshish karti hai.",
            "Log kya kahenge yeh sochkar achhe kaam karna chhod dena galat hai.",
            "Mohabbat toh thi… lekin kismat mein nahi thi.",
            "Zindagi jeene ke do hi tareeke hote hain – ek, jo ho raha hai hone do… ya zimmedaari uthao usse badalne ki.",
            "Zindagi na milegi dobara."
          
    );

	@GetMapping("/popup_message")
	public Messages getPopupmessage() {
		Random random = new Random();
		System.out.println(random.nextInt(MESSAGES.size()));
		String message =MESSAGES.get(random.nextInt(MESSAGES.size()));
		return new Messages(message);
	}
}
