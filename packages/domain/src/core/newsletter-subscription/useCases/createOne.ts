import { type Authorization } from '../../..';
import { type Runtime } from '../../Runtime';

export interface CreateOneNewsletterSubscriptionInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { emailAddress: string };
}

export async function createOne({
    runtime: { emailAdapter, dataSourceAdapter },
    request,
}: CreateOneNewsletterSubscriptionInput): Promise<boolean> {
    const { emailAddress } = request;

    const persistenceSuccess: boolean = await dataSourceAdapter.newsletterSubscriptionRepository.insertOne({
        emailAddress,
        createdAt: new Date(),
    });

    if (!persistenceSuccess) return false;

    const success: boolean = await emailAdapter.sendToOne(
        'PeopleEat',
        emailAddress,
        '20€ Promo Code',
        `
        <!DOCTYPE html>
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
        <head>
        <title>
        </title>
        <!--[if !mso]><!-->
        <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
        <!--<![endif]-->
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
        <meta content="width=device-width, initial-scale=1" name="viewport"/>
        <!--[if mso]>
        <noscript>
        <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        </noscript>
        <![endif]-->
        <!--[if lte mso 11]>
        <style type="text/css" data-inliner="ignore">
        .mj-outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
        <style>a:link {color:#005eff;font-weight:normal;text-decoration:underline;font-style:normal}
        a:visited {color:#005eff;font-weight:normal;text-decoration:underline;font-style:normal}
        a:active {color:#005eff;font-weight:normal;text-decoration:underline;font-style:normal}
        a:hover {color:#005eff;font-weight:normal;text-decoration:underline;font-style:normal}</style><style>#outlook a {
        padding: 0
        }
        body {
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%
        }
        table, td {
        border-collapse: collapse;
        mso-table-lspace: 0;
        mso-table-rspace: 0
        }
        img {
        border: 0;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic
        }
        p {
        display: block;
        margin: 13px 0
        }
        @media only screen and (min-width: 480px) {
        .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%
        }
        }
        .moz-text-html .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%
        }
        @media only screen and (max-width: 480px) {
        div.kl-row.colstack div.kl-column {
        display: block !important;
        width: 100% !important
        }
        }
        .hlb-subblk td {
        word-break: normal
        }
        @media only screen and (max-width: 480px) {
        .hlb-wrapper .hlb-block-settings-content {
        padding: 9px !important
        }
        .hlb-logo {
        padding-bottom: 9px !important
        }
        .r2-tbl {
        width: 100%
        }
        .r2-tbl .lnk {
        width: 100%
        }
        .r2-tbl .hlb-subblk:last-child {
        padding-right: 0 !important
        }
        .r2-tbl .hlb-subblk {
        padding-right: 10px !important
        }
        .kl-hlb-stack {
        display: block !important;
        width: 100% !important;
        padding-right: 0 !important
        }
        .kl-hlb-stack.vspc {
        margin-bottom: 9px
        }
        .kl-hlb-wrap {
        display: inline-block !important;
        width: auto !important
        }
        .kl-hlb-no-wrap {
        display: table-cell !important
        }
        .kl-hlb-wrap.nospc.nospc {
        padding-right: 0 !important
        }
        }
        @media only screen and (max-width: 480px) {
        .component-wrapper .mob-no-spc {
        padding-left: 0 !important;
        padding-right: 0 !important
        }
        }
        @media only screen and (max-width: 480px) {
        .kl-text {
        padding-right: 18px !important;
        padding-left: 18px !important
        }
        }
        .kl-button a {
        display: block !important
        }
        @media screen and (max-width: 480px) {
        .kl-sl-stk {
        display: block !important;
        width: 100% !important;
        padding: 0 0 9px !important;
        text-align: center !important
        }
        .kl-sl-stk.lbls {
        padding: 0 !important
        }
        .kl-sl-stk.spcblk {
        display: none !important
        }
        }
        @media only screen and (max-width: 480px) {
        table.mj-full-width-mobile {
        width: 100% !important
        }
        td.mj-full-width-mobile {
        width: auto !important
        }
        }
        img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        max-width: 100%
        }
        .root-container {
        background-repeat: repeat !important;
        background-size: auto !important;
        background-position: left top !important
        }
        .root-container-spacing {
        padding-top: 50px !important;
        padding-bottom: 20px !important;
        font-size: 0 !important
        }
        .content-padding {
        padding-left: 0 !important;
        padding-right: 0 !important
        }
        .content-padding.first {
        padding-top: 0 !important
        }
        .content-padding.last {
        padding-bottom: 0 !important
        }
        @media only screen and (max-width: 480px) {
        td.mobile-only {
        display: table-cell !important
        }
        div.mobile-only {
        display: block !important
        }
        table.mobile-only {
        display: table !important
        }
        .desktop-only {
        display: none !important
        }
        }
        @media only screen and (max-width: 480px) {
        .table-mobile-only {
        display: table-cell !important;
        max-height: none !important
        }
        .table-mobile-only.block {
        display: block !important
        }
        .table-mobile-only.inline-block {
        display: inline-block !important
        }
        .table-desktop-only {
        max-height: 0 !important;
        display: none !important;
        mso-hide: all !important;
        overflow: hidden !important
        }
        }
        p {
        margin-left: 0;
        margin-right: 0;
        margin-top: 0;
        margin-bottom: 0;
        padding-bottom: 1em
        }
        @media only screen and (max-width: 480px) {
        .kl-text > div, .kl-table-subblock div, .kl-split-subblock > div {
        font-size: 14px !important;
        line-height: 1.3 !important
        }
        }
        h1 {
        color: #ffb8d1;
        font-family: "Helvetica Neue", Arial;
        font-size: 36px;
        font-style: normal;
        font-weight: bold;
        line-height: 1.1;
        letter-spacing: 0;
        margin: 0;
        margin-bottom: 20px;
        text-align: center
        }
        @media only screen and (max-width: 480px) {
        h1 {
        font-size: 40px !important;
        line-height: 1.1 !important
        }
        }
        h2 {
        color: #000;
        font-family: "Helvetica Neue", Arial;
        font-size: 32px;
        font-style: normal;
        font-weight: bold;
        line-height: 1.1;
        letter-spacing: 0;
        margin: 0;
        margin-bottom: 16px;
        text-align: left
        }
        @media only screen and (max-width: 480px) {
        h2 {
        font-size: 32px !important;
        line-height: 1.1 !important
        }
        }
        h3 {
        color: #000;
        font-family: "Helvetica Neue", Arial;
        font-size: 24px;
        font-style: normal;
        font-weight: bold;
        line-height: 1.1;
        letter-spacing: 0;
        margin: 0;
        margin-bottom: 12px;
        text-align: left
        }
        @media only screen and (max-width: 480px) {
        h3 {
        font-size: 24px !important;
        line-height: 1.1 !important
        }
        }
        h4 {
        color: #000;
        font-family: "Helvetica Neue", Arial;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 1.1;
        letter-spacing: 0;
        margin: 0;
        margin-bottom: 9px;
        text-align: left
        }
        @media only screen and (max-width: 480px) {
        h4 {
        font-size: 18px !important;
        line-height: 1.1 !important
        }
        }
        @media only screen and (max-width: 480px) {
        .root-container {
        width: 100% !important
        }
        .root-container-spacing {
        padding: 10px !important
        }
        .content-padding {
        padding-left: 0 !important;
        padding-right: 0 !important
        }
        .content-padding.first {
        padding-top: 0 !important
        }
        .content-padding.last {
        padding-bottom: 0 !important
        }
        .component-wrapper {
        padding-left: 0 !important;
        padding-right: 0 !important
        }
        }</style></head>
        <body style="word-spacing:normal;background-color:#EBEBEB;">
        <div class="root-container" id="bodyTable" style="background-color:#EBEBEB;">
        <div class="root-container-spacing">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section" role="presentation" style="width:100%;">
        <tbody>
        <tr>
        <td>
        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section-outlook" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="margin:0px auto;max-width:600px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
        <tr>
        <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;border-radius:0px 0px 0px 0px;max-width:600px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;border-radius:0px 0px 0px 0px;">
        <tbody>
        <tr>
        <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-left:0px;padding-right:0px;padding-top:0px;text-align:center;">
        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><![endif]-->
        <div class="content-padding first">
        <!--[if true]><table border="0" cellpadding="0" cellspacing="0" width="600" style="width:600px;direction:ltr"><tr><![endif]-->
        <div class="kl-row colstack" style="display:table;table-layout:fixed;width:100%;">
        <!--[if true]><td style="vertical-align:top;width:600px;"><![endif]-->
        <div class="kl-column" style="display:table-cell;vertical-align:top;width:100%;">
        <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper hlb-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
        <tbody>
        <tr>
        <td class="hlb-block-settings-content" style="vertical-align:top;padding-top:32px;padding-right:20px;padding-bottom:16px;padding-left:20px;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
        <tbody>
        <tr>
        <td align="top" class="kl-header-link-bar" style="font-size:0px;padding:0px 0px 0px 0px;word-break:break-word;">
        <table border="0" cellpadding="0" cellspacing="0" style="color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;border:0;" width="100%">
        <tbody>
        <tr>
        <td align="center" class="table-desktop-only hlb-logo" style="display:table-cell;width:100%;padding-bottom:6px;">
        <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;">
        <tbody>
        <tr>
        <!--[if true]><td style="width:600px;" bgcolor="transparent"><![endif]-->
        <!--[if !true]><!--><td style="width:600px;"><!--<![endif]-->
        <a href="http://www.people-eat.com" style="color:#005eff; font-style:normal; font-weight:normal; text-decoration:underline" target="_blank">
        <img alt="PeopleEat, koch für deinen besonderen Anlass zuhause" src="https://d3k81ch9hvuctc.cloudfront.net/company/SaC624/images/5a5ada74-87dc-4dab-978c-9db829a0e240.png" style="display:block;outline:none;text-decoration:none;height:auto;width:100%;background-color:transparent;" width="600"/>
        </a>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper kl-text-table-layout" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
        <tbody>
        <tr>
        <td class="" style="vertical-align:top;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
        <tbody>
        <tr>
        <td align="center" class="kl-text" style="font-size:0px;padding:0px;padding-top:32px;padding-right:40px;padding-bottom:24px;padding-left:40px;word-break:break-word;">
        <div style="font-family:'Helvetica Neue',Arial;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.3;text-align:center;color:#000000;"><h1 style="text-transform: uppercase; text-align: center;"><span style="color: rgb(0, 0, 0);">Deine Anmeldung war erfolgreich! </span><span style="color: rgb(0, 0, 0);">Du kannst deinen Code nun nutzen</span></h1></div>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        </div>
        <!--[if true]></td><![endif]-->
        </div>
        <!--[if true]></tr></table><![endif]-->
        </div>
        <!--[if mso | IE]></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <!--[if mso | IE]></td></tr></table></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <!--[if mso | IE]></td></tr></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section" role="presentation" style="width:100%;">
        <tbody>
        <tr>
        <td>
        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section-outlook" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="margin:0px auto;max-width:600px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
        <tr>
        <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="background:#ffffff url(https://d3k81ch9hvuctc.cloudfront.net/company/SaC624/images/15535ac4-ffb7-413b-a46c-4949fe7a06cc.jpeg) center center / cover no-repeat;background-position:center center;background-repeat:no-repeat;background-size:cover;margin:0px auto;border-radius:0px 0px 0px 0px;max-width:600px;">
        <div style="line-height:0;font-size:0;">
        <table align="center" background="https://d3k81ch9hvuctc.cloudfront.net/company/SaC624/images/15535ac4-ffb7-413b-a46c-4949fe7a06cc.jpeg" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff url(https://d3k81ch9hvuctc.cloudfront.net/company/SaC624/images/15535ac4-ffb7-413b-a46c-4949fe7a06cc.jpeg) center center / cover no-repeat;background-position:center center;background-repeat:no-repeat;background-size:cover;width:100%;border-radius:0px 0px 0px 0px;">
        <tbody>
        <tr>
        <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:40px;padding-left:0px;padding-right:0px;padding-top:40px;text-align:center;">
        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><![endif]-->
        <div class="content-padding">
        <!--[if true]><table border="0" cellpadding="0" cellspacing="0" width="600" style="width:600px;direction:ltr"><tr><![endif]-->
        <div class="kl-row colstack" style="display:table;table-layout:fixed;width:100%;">
        <!--[if true]><td style="vertical-align:top;width:600px;"><![endif]-->
        <div class="kl-column" style="display:table-cell;vertical-align:top;width:100%;">
        <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
        <tbody>
        <tr>
        <td class="" style="vertical-align:top;padding-top:9px;padding-right:18px;padding-bottom:9px;padding-left:18px;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
        <tbody>
        <tr>
        <td align="left" class="kl-text" style="background:#120F13;font-size:0px;padding:0px;padding-top:40px;padding-right:20px;padding-bottom:40px;padding-left:20px;word-break:break-word;">
        <div style="font-family:'Helvetica Neue',Arial;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.3;text-align:left;color:#000000;"><div style="text-align: center;"><span style="font-weight: normal; font-size: 16px; color: rgb(255, 255, 255);">Belohne dich und deine Lieben und lasst euch kulinarisch verwöhnen</span></div>
        <div style="text-align: center;"><span style="font-weight: bold; font-size: 32px; color: rgb(255, 255, 255);">Coupon Code: TAKE20<br/><span style="font-weight: 400; font-size: 14px;"><em>Der Coupon Code ist Gültig bis zum 30.06.2024</em></span><br/></span></div></div>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
        <tbody>
        <tr>
        <td class="" style="vertical-align:top;padding-top:9px;padding-right:40px;padding-bottom:9px;padding-left:40px;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
        <tbody>
        <tr>
        <td align="center" class="kl-button" style="font-size:0px;padding:0px;word-break:break-word;" vertical-align="middle">
        <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate;line-height:100%;">
        <tr>
        <td align="center" bgcolor="#FC6600" role="presentation" style="border:none;border-radius:2px;cursor:auto;mso-padding-alt:16px 30px 16px 30px;background:#FC6600;" valign="middle">
        <a href="http://www.people-eat.com" style="color:#FFF; font-style:normal; font-weight:700; text-decoration:none; display:inline-block; background:#FC6600; font-family:Arial; font-size:16px; line-height:100%; letter-spacing:0; margin:0; text-transform:none; padding:16px 30px 16px 30px; mso-padding-alt:0; border-radius:2px" target="_blank">
        Jetzt entdecken
        </a>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        </div>
        <!--[if true]></td><![endif]-->
        </div>
        <!--[if true]></tr></table><![endif]-->
        </div>
        <!--[if mso | IE]></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        </div>
        <!--[if mso | IE]></td></tr></table></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <!--[if mso | IE]></td></tr></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section" role="presentation" style="width:100%;">
        <tbody>
        <tr>
        <td>
        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section-outlook" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="margin:0px auto;max-width:600px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
        <tr>
        <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;border-radius:0px 0px 0px 0px;max-width:600px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;border-radius:0px 0px 0px 0px;">
        <tbody>
        <tr>
        <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-left:0px;padding-right:0px;padding-top:0px;text-align:center;">
        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><![endif]-->
        <div class="content-padding">
        <!--[if true]><table border="0" cellpadding="0" cellspacing="0" width="600" style="width:600px;direction:ltr"><tr><![endif]-->
        <div class="kl-row colstack" style="display:table;table-layout:fixed;width:100%;">
        <!--[if true]><td style="vertical-align:top;width:600px;"><![endif]-->
        <div class="kl-column" style="display:table-cell;vertical-align:top;width:100%;">
        <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper kl-text-table-layout" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
        <tbody>
        <tr>
        <td class="" style="vertical-align:top;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
        <tbody>
        <tr>
        <td align="center" class="kl-text" style="font-size:0px;padding:0px;padding-top:32px;padding-right:20px;padding-bottom:16px;padding-left:20px;word-break:break-word;">
        <div style="font-family:'Helvetica Neue',Arial;font-size:12px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.3;text-align:center;color:#727272;"><div style="text-align: center;"><span style="font-size: 12px; color: #1a1a1a;">PeopleEat UG, Montgolfier-Allee. 24 60486 Frankfurt am Main</span><br/><span style="color: #ffffff; font-size: 12px;"><span style="color: #1a1a1a;">© 2024| All rights reserved.</span><br/></span></div></div>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
        <tbody>
        <tr>
        <td class="" style="vertical-align:top;padding-top:8px;padding-right:9px;padding-bottom:40px;padding-left:9px;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
        <tbody>
        <tr>
        <td>
        <div style="width:100%;text-align:center">
        <!--[if true]><table style="all:unset;opacity:0;" border="0" cellpadding="0" cellspacing="0" ><tr><![endif]-->
        <!--[if !true]><!--><div class="" style="display:inline-block;"><!--<![endif]-->
        <!--[if true]><td style=""><![endif]-->
        <div style="text-align: center;">
        <a href="https://www.instagram.com/peopleeat_official/" style="color:#005eff; font-style:normal; font-weight:normal; text-decoration:underline" target="_blank">
        <img alt="Instagram" src="https://d3k81ch9hvuctc.cloudfront.net/assets/email/buttons/subtle/instagram_96.png" style="width:32px;" width="32"/>
        </a>
        </div>
        <!--[if true]></td><![endif]-->
        <!--[if !true]><!--></div><!--<![endif]-->
        <!--[if true]></tr></table><![endif]-->
        </div>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        </div>
        <!--[if true]></td><![endif]-->
        </div>
        <!--[if true]></tr></table><![endif]-->
        </div>
        <!--[if mso | IE]></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <!--[if mso | IE]></td></tr></table></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <!--[if mso | IE]></td></tr></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="margin:0px auto;max-width:600px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
        <tr>
        <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;width:100%;" width="100%">
        <tbody>
        <tr>
        <td align="center" class="klBranding" style="font-size:0px;padding:25px 0;word-break:break-word;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
        <tbody>
        </a>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <!--[if mso | IE]></td></tr></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <!--[if mso | IE]></td></tr></table><![endif]-->
        </div>
        </div>
        </body>
        </html>
    `,
    );

    return success;
}
