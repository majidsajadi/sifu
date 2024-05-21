import { formatDate } from "@/utils/date";
import {
  Circle,
  LinkIcon,
  GitCommitHorizontal,
  Pentagon,
  File,
} from "lucide-react";
import { changelog, commits } from "./data";
import { TComparePageProps } from "./types";

import styles from "./page.module.css";
import clsx from "clsx";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardExtra } from "@/ui/card";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  AccordionContent,
  AccordionTrigger,
  Accordion,
  AccordionItem,
} from "@/ui/accordion";
import {
  SelectTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/ui/select";

export default async function Page({ params }: TComparePageProps) {
  return (
    <div>
      <div className={styles.overview}>
        <div className={styles.info}>
          <h3>React</h3>

          <div>
            <Link href="3">Giuthub</Link>
          </div>
        </div>

        <div className={styles.filter}>
          <Select>
            <SelectTrigger prefix="Source" className="w-[280px]">
              <SelectValue placeholder="Select a timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
              <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
              <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
              <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
              <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
              <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
              <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
              <SelectItem value="cet">Central European Time (CET)</SelectItem>
              <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
              <SelectItem value="west">
                Western European Summer Time (WEST)
              </SelectItem>
              <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
              <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
              <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
              <SelectItem value="ist">India Standard Time (IST)</SelectItem>
              <SelectItem value="cst_china">
                China Standard Time (CST)
              </SelectItem>
              <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
              <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
              <SelectItem value="ist_indonesia">
                Indonesia Central Standard Time (WITA)
              </SelectItem>
              <SelectItem value="awst">
                Australian Western Standard Time (AWST)
              </SelectItem>
              <SelectItem value="acst">
                Australian Central Standard Time (ACST)
              </SelectItem>
              <SelectItem value="aest">
                Australian Eastern Standard Time (AEST)
              </SelectItem>
              <SelectItem value="nzst">
                New Zealand Standard Time (NZST)
              </SelectItem>
              <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
              <SelectItem value="art">Argentina Time (ART)</SelectItem>
              <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
              <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
              <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger prefix="Target" className="w-[280px]">
              <SelectValue placeholder="Select a timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
              <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
              <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
              <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
              <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
              <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
              <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
              <SelectItem value="cet">Central European Time (CET)</SelectItem>
              <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
              <SelectItem value="west">
                Western European Summer Time (WEST)
              </SelectItem>
              <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
              <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
              <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
              <SelectItem value="ist">India Standard Time (IST)</SelectItem>
              <SelectItem value="cst_china">
                China Standard Time (CST)
              </SelectItem>
              <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
              <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
              <SelectItem value="ist_indonesia">
                Indonesia Central Standard Time (WITA)
              </SelectItem>
              <SelectItem value="awst">
                Australian Western Standard Time (AWST)
              </SelectItem>
              <SelectItem value="acst">
                Australian Central Standard Time (ACST)
              </SelectItem>
              <SelectItem value="aest">
                Australian Eastern Standard Time (AEST)
              </SelectItem>
              <SelectItem value="nzst">
                New Zealand Standard Time (NZST)
              </SelectItem>
              <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
              <SelectItem value="art">Argentina Time (ART)</SelectItem>
              <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
              <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
              <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <br />
      <div className={styles.container}>
        <Card>
          <CardHeader>
            <CardTitle>Commits</CardTitle>
            <CardExtra>
              <Badge>
                <GitCommitHorizontal size={14} />
                {commits.total} commits
              </Badge>
              <Badge>
                <File size={14} />
                {commits.files} files change
              </Badge>
              <Button variant="secondary" size="icon" asChild>
                <Link href={commits.url}>
                  <LinkIcon size={14} />
                </Link>
              </Button>
            </CardExtra>
          </CardHeader>
          <CardContent>
            <ul className={styles.timeline}>
              <li className={clsx(styles.item, styles.head)}>
                <div className={styles.separator}>
                  <div className={styles.dot}>
                    <Pentagon size={14} />
                  </div>
                  <div className={styles.line}></div>
                </div>
                <div className={styles.content}>2.1.3</div>
              </li>
              {commits.commits.map((commit) => (
                <li className={styles.item}>
                  <div className={styles.separator}>
                    <div className={styles.dot}>
                      <Circle size={12} />
                    </div>
                    <div className={styles.line}></div>
                  </div>
                  <div className={styles.content}>
                    <div className={styles.heading}>
                      <Link href={commit.url} className={styles.sha}>
                        {commit.sha.substring(0, 7)}
                      </Link>
                      <span className={styles.title}>
                        {commit.message.split("\n")[0]}
                      </span>
                    </div>
                    <div className={styles.description}>
                      <span>
                        authored by{" "}
                        <Link
                          href={commit.author.url}
                          className={styles.author}
                        >
                          {commit.author.name}
                        </Link>{" "}
                        on {formatDate(commit.date)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
              <li className={clsx(styles.item, styles.head)}>
                <div className={styles.separator}>
                  <div className={styles.dot}>
                    <Pentagon size={14} />
                  </div>
                </div>
                <div className={styles.content}>2.1.3</div>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Changelog</CardTitle>
            <CardExtra>
              <Button variant="secondary" size="icon" asChild>
                <Link href={changelog.href}>
                  <LinkIcon size={14} />
                </Link>
              </Button>
            </CardExtra>
          </CardHeader>
          <CardContent>
            <Accordion
              type="multiple"
              defaultValue={changelog.entries.map((ent) => ent.version)}
            >
              {changelog.entries.map((entry) => (
                <AccordionItem value={entry.version}>
                  <AccordionTrigger>{entry.version}</AccordionTrigger>
                  <AccordionContent className={styles.md}>
                    <MDXRemote source={entry.content} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
