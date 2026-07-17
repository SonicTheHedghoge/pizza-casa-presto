import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cart, customerInfo, orderTotal } = body;

    if (!cart || !customerInfo) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const { name, phone, address, notes, paymentMethod } = customerInfo;

    // Compile dynamic order items HTML
    const itemsHtml = cart
      .map(
        (item: any) => `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; font-weight: bold; color: #1a1a1a;">
          ${item.name} ${item.size ? `<span style="font-size: 11px; background: #f37021; color: white; padding: 2px 6px; border-radius: 4px; margin-left: 6px;">${item.size}</span>` : ""}
        </td>
        <td style="padding: 12px; text-align: center; color: #666;">x${item.quantity}</td>
        <td style="padding: 12px; text-align: right; font-weight: bold; color: #1a1a1a;">${(item.price * item.quantity).toFixed(3)} dt</td>
      </tr>
    `
      )
      .join("");

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Nouvelle Commande Casa Presto</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; margin: 0; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border: 1px solid #eee;">
            <div style="background: #f37021; padding: 30px; text-align: center; color: white;">
              <h1 style="margin: 0; font-size: 28px; font-style: italic; font-weight: 800;">🍕 CASA PRESTO</h1>
              <p style="margin: 5px 0 0; opacity: 0.9; font-weight: bold;">Nouvelle Commande Reçue !</p>
            </div>
            
            <div style="padding: 30px;">
              <h2 style="border-bottom: 2px solid #f37021; padding-bottom: 8px; margin-top: 0; color: #1a1a1a; font-size: 18px;">📋 Informations Client</h2>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
                <tr>
                  <td style="padding: 8px 0; color: #666; width: 120px;">Nom:</td>
                  <td style="padding: 8px 0; font-weight: bold; color: #1a1a1a;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Téléphone:</td>
                  <td style="padding: 8px 0; font-weight: bold; color: #f37021; font-size: 16px;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Adresse:</td>
                  <td style="padding: 8px 0; font-weight: bold; color: #1a1a1a;">${address}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Paiement:</td>
                  <td style="padding: 8px 0; color: #1a1a1a;">${paymentMethod === "cod" ? "Espèces à la livraison" : "Carte"}</td>
                </tr>
                ${notes ? `
                <tr>
                  <td style="padding: 8px 0; color: #666; vertical-align: top;">Notes:</td>
                  <td style="padding: 8px 0; color: #555; font-style: italic;">"${notes}"</td>
                </tr>` : ""}
              </table>

              <h2 style="border-bottom: 2px solid #f37021; padding-bottom: 8px; color: #1a1a1a; font-size: 18px;">🛒 Détail des Articles</h2>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
                <thead>
                  <tr style="background: #fcfcfc; border-bottom: 2px solid #eee;">
                    <th style="padding: 12px; text-align: left; color: #666; font-size: 12px;">Article</th>
                    <th style="padding: 12px; text-align: center; color: #666; font-size: 12px; width: 60px;">Qté</th>
                    <th style="padding: 12px; text-align: right; color: #666; font-size: 12px; width: 100px;">Prix</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>

              <div style="background: #f9f9f9; padding: 20px; border-radius: 12px; border: 1px solid #eee; text-align: right;">
                <span style="font-size: 14px; color: #666; font-weight: bold; display: block; margin-bottom: 4px;">TOTAL COMMANDE</span>
                <span style="font-size: 28px; font-weight: 900; color: #f37021;">${Number(orderTotal).toFixed(3)} dt</span>
              </div>
            </div>
            
            <div style="background: #1a1a1a; padding: 20px; text-align: center; color: #888; font-size: 11px;">
              Cette commande a été passée depuis le site internet de Pizza Casa Presto Djerba.
            </div>
          </div>
        </body>
      </html>
    `;

    const resendApiKey = process.env.RESEND_API_KEY;
    const ownerEmail = process.env.OWNER_EMAIL || "pizza.casapresto.djerba@gmail.com";

    // If Resend API key is not configured, log output to server console for easy debugging/testing
    if (!resendApiKey || resendApiKey === "re_YOUR_KEY") {
      console.log("\n========================================================");
      console.log("🚨 [MOCK ORDER EMAIL] - RESEND NOT CONFIGURED YET");
      console.log(`To: ${ownerEmail}`);
      console.log(`Subject: 🍕 Nouvelle Commande de ${name} (${phone})`);
      console.log("--------------------------------------------------------");
      console.log(`Customer: ${name} | Phone: ${phone}`);
      console.log(`Address: ${address}`);
      if (notes) console.log(`Notes: ${notes}`);
      console.log("Items:");
      cart.forEach((i: any) => console.log(` - ${i.quantity}x ${i.name} ${i.size ? `(${i.size})` : ""} - ${(i.price * i.quantity).toFixed(3)} dt`));
      console.log(`Total: ${Number(orderTotal).toFixed(3)} dt`);
      console.log("========================================================\n");

      return NextResponse.json({
        success: true,
        mock: true,
        message: "Commande enregistrée (Mode simulation: détails affichés dans la console)"
      });
    }

    // Send email using Resend API directly over HTTP Fetch
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Casa Presto Orders <onboarding@resend.dev>", // Or verified domain
        to: ownerEmail,
        subject: `🍕 Nouvelle Commande de ${name} (${phone})`,
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Resend API Error:", errText);
      return NextResponse.json({ error: "Erreur lors de l'envoi du mail" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Commande envoyée avec succès !" });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "Erreur serveur interne" }, { status: 500 });
  }
}
